"""
Script untuk menambahkan data awal (seed data)
"""
from matakuliah_api.models.matakuliah import Matakuliah
from matakuliah_api.database import SessionLocal, engine
from matakuliah_api.models.matakuliah import Base


def init_db():
    """Inisialisasi database dan tambahkan data awal"""
    
    # Buat semua tabel
    Base.metadata.create_all(engine)
    
    db = SessionLocal()
    
    # Cek apakah sudah ada data
    existing = db.query(Matakuliah).first()
    if existing:
        print("✅ Database sudah berisi data, skip seeding")
        db.close()
        return
    
    # Data awal matakuliah
    sample_data = [
        {
            'kode_mk': 'IF101',
            'nama_mk': 'Algoritma dan Pemrograman',
            'sks': 3,
            'semester': 1
        },
        {
            'kode_mk': 'IF102',
            'nama_mk': 'Struktur Data',
            'sks': 3,
            'semester': 2
        },
        {
            'kode_mk': 'IF103',
            'nama_mk': 'Basis Data',
            'sks': 4,
            'semester': 2
        },
        {
            'kode_mk': 'IF104',
            'nama_mk': 'Pemrograman Web',
            'sks': 3,
            'semester': 3
        },
        {
            'kode_mk': 'IF105',
            'nama_mk': 'Sistem Operasi',
            'sks': 3,
            'semester': 3
        },
    ]
    
    # Tambahkan data ke database
    for data in sample_data:
        matakuliah = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=data['sks'],
            semester=data['semester']
        )
        db.add(matakuliah)
    
    # Commit
    db.commit()
    print(f"✅ {len(sample_data)} data matakuliah berhasil ditambahkan")
    db.close()


if __name__ == '__main__':
    init_db()
