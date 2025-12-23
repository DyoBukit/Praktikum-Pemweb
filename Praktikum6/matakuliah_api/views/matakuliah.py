"""
Views untuk API Matakuliah
Implementasi endpoint CRUD untuk matakuliah
"""
import json
from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import IntegrityError
from matakuliah_api.models.matakuliah import Matakuliah
from matakuliah_api.database import SessionLocal


def json_response(data, status=200):
    """
    Helper function untuk membuat JSON response
    
    Args:
        data (dict): Data yang akan diubah menjadi JSON
        status (int): HTTP status code
        
    Returns:
        Response: Pyramid Response object
    """
    return Response(
        body=json.dumps(data, indent=2).encode('utf-8'),
        status=status,
        content_type='application/json'
    )


def error_response(message, status=400):
    """
    Helper function untuk membuat error response
    
    Args:
        message (str): Error message
        status (int): HTTP status code
        
    Returns:
        Response: Pyramid Response object dengan error
    """
    return json_response({'error': message}, status=status)


# ==================== GET ALL MATAKULIAH ====================
@view_config(route_name='matakuliah_list', request_method='GET')
def get_all_matakuliah(request):
    """
    GET /api/matakuliah
    Mendapatkan semua data matakuliah
    
    Returns:
        dict: List semua matakuliah
    """
    db = SessionLocal()
    try:
        matakuliahs = db.query(Matakuliah).all()
        return json_response({
            'matakuliahs': [mk.to_dict() for mk in matakuliahs]
        })
    finally:
        db.close()


# ==================== GET SINGLE MATAKULIAH ====================
@view_config(route_name='matakuliah_detail', request_method='GET')
def get_matakuliah(request):
    """
    GET /api/matakuliah/{id}
    Mendapatkan detail satu matakuliah berdasarkan ID
    
    Returns:
        dict: Data matakuliah yang diminta atau error 404
    """
    mk_id = request.matchdict.get('id')
    db = SessionLocal()
    
    try:
        matakuliah = db.query(Matakuliah).filter(Matakuliah.id == mk_id).first()
        
        if not matakuliah:
            return error_response('Matakuliah tidak ditemukan', status=404)
        
        return json_response(matakuliah.to_dict())
    finally:
        db.close()


# ==================== CREATE MATAKULIAH ====================
@view_config(route_name='matakuliah_list', request_method='POST')
def create_matakuliah(request):
    """
    POST /api/matakuliah
    Menambahkan matakuliah baru
    
    Request body:
        {
            "kode_mk": "IF101",
            "nama_mk": "Algoritma dan Pemrograman",
            "sks": 3,
            "semester": 1
        }
    
    Returns:
        dict: Data matakuliah yang baru dibuat atau error
    """
    db = SessionLocal()
    
    try:
        # Parse JSON body
        body = request.json_body
        
        # Validasi required fields
        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
        for field in required_fields:
            if field not in body:
                return error_response(f'Field {field} harus diisi', status=400)
        
        # Validasi tipe data
        try:
            sks = int(body['sks'])
            semester = int(body['semester'])
        except (ValueError, TypeError):
            return error_response('SKS dan Semester harus berupa angka', status=400)
        
        # Validasi range
        if sks <= 0:
            return error_response('SKS harus lebih besar dari 0', status=400)
        if semester <= 0 or semester > 8:
            return error_response('Semester harus antara 1-8', status=400)
        
        # Buat object baru
        new_matakuliah = Matakuliah(
            kode_mk=body['kode_mk'].strip(),
            nama_mk=body['nama_mk'].strip(),
            sks=sks,
            semester=semester
        )
        
        db.add(new_matakuliah)
        db.commit()
        db.refresh(new_matakuliah)
        
        return json_response(new_matakuliah.to_dict(), status=201)
        
    except IntegrityError:
        db.rollback()
        return error_response('Kode matakuliah sudah terdaftar', status=400)
    except Exception as e:
        db.rollback()
        return error_response(f'Error: {str(e)}', status=500)
    finally:
        db.close()


# ==================== UPDATE MATAKULIAH ====================
@view_config(route_name='matakuliah_detail', request_method='PUT')
def update_matakuliah(request):
    """
    PUT /api/matakuliah/{id}
    Mengupdate data matakuliah
    
    Request body:
        {
            "kode_mk": "IF101",
            "nama_mk": "Algoritma dan Pemrograman",
            "sks": 3,
            "semester": 1
        }
    
    Returns:
        dict: Data matakuliah yang sudah diupdate atau error
    """
    mk_id = request.matchdict.get('id')
    db = SessionLocal()
    
    try:
        # Cari matakuliah
        matakuliah = db.query(Matakuliah).filter(Matakuliah.id == mk_id).first()
        
        if not matakuliah:
            return error_response('Matakuliah tidak ditemukan', status=404)
        
        # Parse JSON body
        body = request.json_body
        
        # Update fields jika ada di request
        if 'kode_mk' in body:
            matakuliah.kode_mk = body['kode_mk'].strip()
        
        if 'nama_mk' in body:
            matakuliah.nama_mk = body['nama_mk'].strip()
        
        if 'sks' in body:
            try:
                sks = int(body['sks'])
                if sks <= 0:
                    return error_response('SKS harus lebih besar dari 0', status=400)
                matakuliah.sks = sks
            except (ValueError, TypeError):
                return error_response('SKS harus berupa angka', status=400)
        
        if 'semester' in body:
            try:
                semester = int(body['semester'])
                if semester <= 0 or semester > 8:
                    return error_response('Semester harus antara 1-8', status=400)
                matakuliah.semester = semester
            except (ValueError, TypeError):
                return error_response('Semester harus berupa angka', status=400)
        
        db.commit()
        db.refresh(matakuliah)
        
        return json_response(matakuliah.to_dict())
        
    except IntegrityError:
        db.rollback()
        return error_response('Kode matakuliah sudah terdaftar', status=400)
    except Exception as e:
        db.rollback()
        return error_response(f'Error: {str(e)}', status=500)
    finally:
        db.close()


# ==================== DELETE MATAKULIAH ====================
@view_config(route_name='matakuliah_detail', request_method='DELETE')
def delete_matakuliah(request):
    """
    DELETE /api/matakuliah/{id}
    Menghapus matakuliah berdasarkan ID
    
    Returns:
        dict: Message sukses atau error
    """
    mk_id = request.matchdict.get('id')
    db = SessionLocal()
    
    try:
        # Cari matakuliah
        matakuliah = db.query(Matakuliah).filter(Matakuliah.id == mk_id).first()
        
        if not matakuliah:
            return error_response('Matakuliah tidak ditemukan', status=404)
        
        # Hapus
        db.delete(matakuliah)
        db.commit()
        
        return json_response({'message': 'Matakuliah berhasil dihapus'})
        
    except Exception as e:
        db.rollback()
        return error_response(f'Error: {str(e)}', status=500)
    finally:
        db.close()
