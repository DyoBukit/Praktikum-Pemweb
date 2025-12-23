"""
Main application entry point
Konfigurasi Pyramid application
"""
from pyramid.config import Configurator


def main(global_config, **settings):
    """
    Fungsi utama untuk konfigurasi aplikasi Pyramid
    
    Args:
        global_config (dict): Konfigurasi global
        **settings (dict): Pengaturan aplikasi
        
    Returns:
        wsgi.app: WSGI application
    """
    config = Configurator(settings=settings)
    
    # Setup routes
    config.add_route('matakuliah_list', '/api/matakuliah')
    config.add_route('matakuliah_detail', '/api/matakuliah/{id}')
    
    # Scan views
    config.scan('matakuliah_api.views')
    
    return config.make_wsgi_app()
