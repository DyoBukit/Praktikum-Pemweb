"""
Database Model untuk Matakuliah
"""
from sqlalchemy import Column, Integer, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Matakuliah(Base):
    """
    Model untuk tabel matakuliah
    
    Attributes:
        id (int): Primary key, auto increment
        kode_mk (str): Kode mata kuliah (unique, not null)
        nama_mk (str): Nama mata kuliah (not null)
        sks (int): Jumlah SKS (not null)
        semester (int): Semester pengambilan (not null)
    """
    __tablename__ = 'matakuliah'
    
    id = Column(Integer, primary_key=True)
    kode_mk = Column(Text, unique=True, nullable=False)
    nama_mk = Column(Text, nullable=False)
    sks = Column(Integer, nullable=False)
    semester = Column(Integer, nullable=False)
    
    def to_dict(self):
        """
        Konversi object Matakuliah ke dictionary
        
        Returns:
            dict: Dictionary berisi semua atribut matakuliah
        """
        return {
            'id': self.id,
            'kode_mk': self.kode_mk,
            'nama_mk': self.nama_mk,
            'sks': self.sks,
            'semester': self.semester,
        }
