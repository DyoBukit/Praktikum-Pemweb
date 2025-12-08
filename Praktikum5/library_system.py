from abc import ABC, abstractmethod

# =========================================================
# Abstract Class - Dasar semua item perpustakaan
# =========================================================
class LibraryItem(ABC):

    def __init__(self, item_id, title):
        self._item_id = item_id              # protected (encapsulation)
        self.__title = title                 # private (encapsulation)

    @property
    def title(self):
        """Property untuk mengakses title (read-only)"""
        return self.__title

    @abstractmethod
    def display_info(self):
        """Method abstract yang wajib diimplementasikan subclass"""
        pass


# =========================================================
# Subclass: Book
# =========================================================
class Book(LibraryItem):
    def __init__(self, item_id, title, author, pages):
        super().__init__(item_id, title)
        self.author = author
        self.pages = pages

    def display_info(self):
        """Polymorphism: Format info khusus Book"""
        print(f"[BOOK] ID: {self._item_id} | Title: {self.title} | Author: {self.author} | Pages: {self.pages}")


# =========================================================
# Subclass: Magazine
# =========================================================
class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue_number):
        super().__init__(item_id, title)
        self.issue_number = issue_number

    def display_info(self):
        """Polymorphism: Format info khusus Magazine"""
        print(f"[MAGAZINE] ID: {self._item_id} | Title: {self.title} | Issue: {self.issue_number}")


# =========================================================
# Class Library untuk manajemen item
# =========================================================
class Library:
    def __init__(self):
        self.__collection = []  # private list (encapsulation)

    def add_item(self, item: LibraryItem):
        """Menambahkan item ke koleksi perpustakaan"""
        self.__collection.append(item)
        print("Item berhasil ditambahkan!\n")

    def show_items(self):
        """Menampilkan semua item yang tersedia"""
        if not self.__collection:
            print("Tidak ada item di perpustakaan.\n")
            return

        print("===== DAFTAR ITEM PERPUSTAKAAN =====")
        for item in self.__collection:
            item.display_info()   # polymorphism
        print()

    def search_item(self, keyword):
        """Mencari item berdasarkan ID atau judul"""
        print(f"Hasil pencarian untuk '{keyword}':")
        found = False
        for item in self.__collection:
            if keyword.lower() in item.title.lower() or keyword == item._item_id:
                item.display_info()
                found = True
        if not found:
            print("Item tidak ditemukan.\n")
        print()


# =========================================================
# MAIN PROGRAM
# =========================================================
def main():
    library = Library()

    # Tambahkan item awal
    book1 = Book("B001", "Pemrograman Python", "Andi", 350)
    book2 = Book("B002", "Belajar Machine Learning", "Dewi", 420)
    magazine1 = Magazine("M001", "Tech Monthly", "Vol. 12")

    library.add_item(book1)
    library.add_item(book2)
    library.add_item(magazine1)

    # Menu interaktif
    while True:
        print("\n===== SISTEM MANAJEMEN PERPUSTAKAAN =====")
        print("1. Tambah Item Baru")
        print("2. Tampilkan Semua Item")
        print("3. Cari Item")
        print("4. Keluar")

        pilihan = input("Pilih menu: ")

        if pilihan == "1":
            print("\nTambah Item Baru")
            print("1. Book")
            print("2. Magazine")
            jenis = input("Pilih jenis item: ")

            if jenis == "1":
                item_id = input("ID: ")
                title = input("Judul: ")
                author = input("Author: ")
                pages = int(input("Jumlah halaman: "))
                library.add_item(Book(item_id, title, author, pages))

            elif jenis == "2":
                item_id = input("ID: ")
                title = input("Judul: ")
                issue = input("Issue number: ")
                library.add_item(Magazine(item_id, title, issue))

        elif pilihan == "2":
            library.show_items()

        elif pilihan == "3":
            keyword = input("Masukkan ID atau Judul: ")
            library.search_item(keyword)

        elif pilihan == "4":
            print("Program selesai.")
            break

        else:
            print("Menu tidak valid!\n")


if __name__ == "__main__":
    main()
