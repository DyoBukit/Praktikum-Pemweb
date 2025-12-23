# ============================================
# PANDUAN TEST API MATAKULIAH
# ============================================

## 1️⃣  GET ALL MATAKULIAH
```powershell
Invoke-WebRequest -Uri "http://localhost:6543/api/matakuliah" -Method GET -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Response (200 OK):**
```json
{
  "matakuliahs": [
    {
      "id": 1,
      "kode_mk": "IF101",
      "nama_mk": "Algoritma dan Pemrograman",
      "sks": 3,
      "semester": 1
    },
    {
      "id": 2,
      "kode_mk": "IF102",
      "nama_mk": "Struktur Data",
      "sks": 3,
      "semester": 2
    }
  ]
}
```

---

## 2️⃣  GET MATAKULIAH BY ID
```powershell
Invoke-WebRequest -Uri "http://localhost:6543/api/matakuliah/1" -Method GET -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Response (200 OK):**
```json
{
  "id": 1,
  "kode_mk": "IF101",
  "nama_mk": "Algoritma dan Pemrograman",
  "sks": 3,
  "semester": 1
}
```

---

## 3️⃣  CREATE MATAKULIAH (POST)
```powershell
$body = @{
    kode_mk = "IF106"
    nama_mk = "Grafika Komputer"
    sks = 3
    semester = 4
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:6543/api/matakuliah" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Response (201 Created):**
```json
{
  "id": 6,
  "kode_mk": "IF106",
  "nama_mk": "Grafika Komputer",
  "sks": 3,
  "semester": 4
}
```

---

## 4️⃣  UPDATE MATAKULIAH (PUT)
```powershell
$body = @{
    nama_mk = "Struktur Data - Advanced"
    sks = 4
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:6543/api/matakuliah/2" `
    -Method PUT `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Response (200 OK):**
```json
{
  "id": 2,
  "kode_mk": "IF102",
  "nama_mk": "Struktur Data - Advanced",
  "sks": 4,
  "semester": 2
}
```

---

## 5️⃣  DELETE MATAKULIAH
```powershell
Invoke-WebRequest -Uri "http://localhost:6543/api/matakuliah/6" -Method DELETE -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Response (200 OK):**
```json
{
  "message": "Matakuliah berhasil dihapus"
}
```

---

## 📝 ERROR RESPONSES

### 404 Not Found
```powershell
Invoke-WebRequest -Uri "http://localhost:6543/api/matakuliah/999" -Method GET -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Response (404):**
```json
{
  "error": "Matakuliah tidak ditemukan"
}
```

### 400 Bad Request (Missing Field)
```powershell
$body = @{
    kode_mk = "IF107"
    nama_mk = "Web Services"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:6543/api/matakuliah" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Response (400):**
```json
{
  "error": "Field sks harus diisi"
}
```

### 400 Bad Request (Invalid Semester)
```powershell
$body = @{
    kode_mk = "IF107"
    nama_mk = "Web Services"
    sks = 3
    semester = 10
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:6543/api/matakuliah" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Response (400):**
```json
{
  "error": "Semester harus antara 1-8"
}
```

---

## 💡 TIPS

- Gunakan `-UseBasicParsing` untuk menghindari security warning
- Gunakan `-Headers @{"Content-Type"="application/json"}` untuk POST/PUT
- Gunakan backtick (`) di PowerShell untuk line break

## 🚀 RUN SERVER DULU!
```powershell
cd C:\Dyo\Kuliah\Pemweb\Praktikum-Pemweb\Praktikum6
python run.py
```

Server akan berjalan di: **http://localhost:6543**
