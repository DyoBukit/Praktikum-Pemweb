"""
Server entry point
Jalankan dengan: python run.py
"""
import os
import sys
import traceback

# Pastikan path module benar
sys.path.insert(0, os.path.dirname(__file__))

try:
    # Inisialisasi database
    from matakuliah_api.models.matakuliah import Base
    from matakuliah_api.database import engine
    
    # Create tables if not exist
    Base.metadata.create_all(engine)
    
    from waitress import serve
    from matakuliah_api import main
    
    if __name__ == '__main__':
        try:
            app = main({}, **{})
            print("\n" + "="*50)
            print("🚀 API Manajemen Matakuliah")
            print("="*50)
            print("📍 Server berjalan di http://localhost:6543")
            print("📚 Dokumentasi: README.md")
            print("🔗 Endpoint: /api/matakuliah")
            print("="*50 + "\n")
            
            serve(app, host='0.0.0.0', port=6543)
        except Exception as e:
            print(f"❌ Error saat startup: {e}")
            traceback.print_exc()
            sys.exit(1)

except ImportError as e:
    print(f"❌ Import error: {e}")
    traceback.print_exc()
    sys.exit(1)
