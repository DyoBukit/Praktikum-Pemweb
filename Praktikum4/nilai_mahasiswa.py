# ================================================
# Program Pengelolaan Data Nilai Mahasiswa
# Praktikum Python
# ================================================

# Data awal mahasiswa (minimal 5 data)
mahasiswa_list = [
    {"nama": "Ayu", "nim": "130140001", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Budi", "nim": "130140002", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 72},
    {"nama": "Citra", "nim": "130140003", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 63},
    {"nama": "Doni", "nim": "130140004", "nilai_uts": 50, "nilai_uas": 55, "nilai_tugas": 52},
    {"nama": "Eka", "nim": "130140005", "nilai_uts": 92, "nilai_uas": 88, "nilai_tugas": 90},

    {"nama": "Farhan", "nim": "130140006", "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 80},
    {"nama": "Gita", "nim": "130140007", "nilai_uts": 88, "nilai_uas": 84, "nilai_tugas": 90},
    {"nama": "Hadi", "nim": "130140008", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 68},
    {"nama": "Intan", "nim": "130140009", "nilai_uts": 74, "nilai_uas": 76, "nilai_tugas": 79},
    {"nama": "Joko", "nim": "130140010", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 58},

    {"nama": "Karin", "nim": "130140011", "nilai_uts": 82, "nilai_uas": 85, "nilai_tugas": 80},
    {"nama": "Lutfi", "nim": "130140012", "nilai_uts": 47, "nilai_uas": 52, "nilai_tugas": 50},
    {"nama": "Maya", "nim": "130140013", "nilai_uts": 91, "nilai_uas": 93, "nilai_tugas": 92},
    {"nama": "Naufal", "nim": "130140014", "nilai_uts": 69, "nilai_uas": 72, "nilai_tugas": 70},
    {"nama": "Oksi", "nim": "130140015", "nilai_uts": 58, "nilai_uas": 60, "nilai_tugas": 62},

    {"nama": "Putri", "nim": "130140016", "nilai_uts": 87, "nilai_uas": 90, "nilai_tugas": 89},
    {"nama": "Qori", "nim": "130140017", "nilai_uts": 77, "nilai_uas": 74, "nilai_tugas": 76},
    {"nama": "Rangga", "nim": "130140018", "nilai_uts": 66, "nilai_uas": 68, "nilai_tugas": 70},
    {"nama": "Salsa", "nim": "130140019", "nilai_uts": 83, "nilai_uas": 80, "nilai_tugas": 85},
    {"nama": "Tono", "nim": "130140020", "nilai_uts": 49, "nilai_uas": 55, "nilai_tugas": 53},

    {"nama": "Umar", "nim": "130140021", "nilai_uts": 73, "nilai_uas": 77, "nilai_tugas": 75},
    {"nama": "Vina", "nim": "130140022", "nilai_uts": 81, "nilai_uas": 79, "nilai_tugas": 82},
    {"nama": "Wahyu", "nim": "130140023", "nilai_uts": 95, "nilai_uas": 92, "nilai_tugas": 94},
    {"nama": "Xena", "nim": "130140024", "nilai_uts": 63, "nilai_uas": 67, "nilai_tugas": 65},
    {"nama": "Yusuf", "nim": "130140025", "nilai_uts": 52, "nilai_uas": 58, "nilai_tugas": 60},
]

# ------------------------------------------------
# Fungsi: Hitung Nilai Akhir
# Rumus: 30% UTS + 40% UAS + 30% Tugas
# ------------------------------------------------
def hitung_nilai_akhir(uts, uas, tugas):
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)

# ------------------------------------------------
# Fungsi: Tentukan Grade
# ------------------------------------------------
def tentukan_grade(nilai_akhir):
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

# ------------------------------------------------
# Fungsi: Tampilkan Data dalam Format Tabel
# ------------------------------------------------
def tampilkan_data():
    print("\n=== DATA NILAI MAHASISWA ===")
    print(f"{'Nama':<10} {'NIM':<8} {'UTS':<5} {'UAS':<5} {'Tugas':<7} {'Akhir':<7} {'Grade'}")
    print("-" * 60)

    for m in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(m["nilai_uts"], m["nilai_uas"], m["nilai_tugas"])
        grade = tentukan_grade(nilai_akhir)

        print(f"{m['nama']:<10} {m['nim']:<8} {m['nilai_uts']:<5} {m['nilai_uas']:<5} "
              f"{m['nilai_tugas']:<7} {nilai_akhir:<7.2f} {grade}")

# ------------------------------------------------
# Fungsi: Cari Mahasiswa Nilai Tertinggi
# ------------------------------------------------
def cari_tertinggi():
    return max(mahasiswa_list,
               key=lambda m: hitung_nilai_akhir(m["nilai_uts"], m["nilai_uas"], m["nilai_tugas"]))

# ------------------------------------------------
# Fungsi: Cari Mahasiswa Nilai Terendah
# ------------------------------------------------
def cari_terendah():
    return min(mahasiswa_list,
               key=lambda m: hitung_nilai_akhir(m["nilai_uts"], m["nilai_uas"], m["nilai_tugas"]))

# ------------------------------------------------
# Fungsi: Input Data Mahasiswa Baru
# ------------------------------------------------
def tambah_data():
    print("\n=== INPUT DATA MAHASISWA BARU ===")
    nama = input("Nama   : ")
    nim = input("NIM    : ")
    uts = float(input("Nilai UTS   : "))
    uas = float(input("Nilai UAS   : "))
    tugas = float(input("Nilai Tugas : "))

    mahasiswa_baru = {
        "nama": nama,
        "nim": nim,
        "nilai_uts": uts,
        "nilai_uas": uas,
        "nilai_tugas": tugas
    }

    mahasiswa_list.append(mahasiswa_baru)
    print(">> Data berhasil ditambahkan!")

# ------------------------------------------------
# Fungsi: Filter Mahasiswa Berdasarkan Grade
# ------------------------------------------------
def filter_grade():
    g = input("Masukkan grade yang ingin difilter (A/B/C/D/E): ").upper()
    print(f"\nMahasiswa dengan grade {g}:")
    print("-" * 30)

    ditemukan = False

    for m in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(m["nilai_uts"], m["nilai_uas"], m["nilai_tugas"])
        if tentukan_grade(nilai_akhir) == g:
            print(f"- {m['nama']} ({m['nim']}) : {nilai_akhir:.2f}")
            ditemukan = True

    if not ditemukan:
        print("Tidak ada mahasiswa dengan grade tersebut.")

# ------------------------------------------------
# Fungsi: Hitung Rata-Rata Nilai Kelas
# ------------------------------------------------
def rata_rata_kelas():
    total = 0
    for m in mahasiswa_list:
        total += hitung_nilai_akhir(m["nilai_uts"], m["nilai_uas"], m["nilai_tugas"])

    return total / len(mahasiswa_list)

# ------------------------------------------------
# MENU UTAMA
# ------------------------------------------------
def menu():
    while True:
        print("\n========== MENU ==========")
        print("1. Tampilkan Data Mahasiswa")
        print("2. Input Data Mahasiswa Baru")
        print("3. Cari Mahasiswa Nilai Tertinggi")
        print("4. Cari Mahasiswa Nilai Terendah")
        print("5. Filter Mahasiswa Berdasarkan Grade")
        print("6. Hitung Rata-Rata Nilai Kelas")
        print("0. Keluar")
        print("==========================")

        pilihan = input("Pilih menu: ")

        if pilihan == "1":
            tampilkan_data()
        elif pilihan == "2":
            tambah_data()
        elif pilihan == "3":
            m = cari_tertinggi()
            print(f"\n>> Nilai tertinggi: {m['nama']} ({m['nim']})")
        elif pilihan == "4":
            m = cari_terendah()
            print(f"\n>> Nilai terendah: {m['nama']} ({m['nim']})")
        elif pilihan == "5":
            filter_grade()
        elif pilihan == "6":
            print(f"\nRata-rata nilai kelas: {rata_rata_kelas():.2f}")
        elif pilihan == "0":
            print("Program selesai. Terima kasih!")
            break
        else:
            print("Pilihan tidak valid!")

# Jalankan program
menu()
