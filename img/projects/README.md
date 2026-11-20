# Screenshot project untuk portofolio yoluvy.dev

Folder ini berisi screenshot setiap project yang tampil di situs portofolio
(repo `D:\Dev\portofolio`). Situs mencari gambar di sini secara otomatis,
jadi **tidak perlu mengubah kode HTML apa pun**: cukup taruh file dengan nama
yang benar. Selama file belum ada, situs menampilkan mockup gambar sebagai
pengganti.

## Lokasi dan nama file

Simpan di:

```
D:\Dev\portofolio\img\projects\<slug>\
```

Isi setiap folder:

| File           | Dipakai untuk                                                              |
|----------------|-----------------------------------------------------------------------------|
| `cover.webp`   | Gambar utama: kartu di halaman Projects, beranda, dan bagian atas halaman detail |
| `shot-1.webp`  | Galeri halaman detail (untuk app/game juga tampil di samping cover)         |
| `shot-2.webp`  | Galeri halaman detail (untuk app/game juga tampil di samping cover)         |
| `shot-3.webp`  | Galeri halaman detail                                                        |
| `shot-4.webp`  | Galeri halaman detail                                                        |

- Nama file harus persis seperti di atas: huruf kecil, ekstensi `.webp`.
- Semua file opsional. Minimal `cover.webp`; shot yang tidak ada akan
  disembunyikan otomatis.
- `cover.webp` sebaiknya layar paling menarik (halaman utama/gameplay).
  `shot-1` sampai `shot-4` berisi fitur lain.

## Ukuran

- **Mobile app & game** (ditampilkan di bingkai HP): screenshot HP **portrait**,
  sekitar **1080×2340** (rasio 9:19.5). Screenshot HP biasa sudah pas.
  Jangan dipotong atau diberi bingkai, karena bingkai HP sudah digambar oleh situs.
- **Web app & API** (ditampilkan di bingkai browser): **lanskap 1600×1000**
  (rasio 16:10). Ambil isi halaman saja, tanpa address bar browser.
- Ukuran file usahakan di bawah ±300 KB per gambar.

## Daftar slug

| Slug                 | Project                         | Jenis bingkai |
|----------------------|---------------------------------|---------------|
| `warung-tycoon`      | Warung Tycoon                   | HP (game)     |
| `tropimori`          | Tropimori: Cozy Island Farm     | HP (game)     |
| `cabinet80s`         | Cabinet80s: Offline Retro Game  | HP (game)     |
| `tasbihgo`           | TasbihGo - Tasbih & Dzikir      | HP            |
| `nusa-tasks`         | Nusa Tasks: Daily Planner       | HP            |
| `ourmoney`           | OurMoney: Plan Your Money       | HP            |
| `absensi-face`       | Absensi Face Recognition + GPS  | HP            |
| `food-delivery`      | Food Delivery                   | HP            |
| `laundry-app`        | Laundry App                     | HP            |
| `buku-bisnis`        | Aplikasi Buku Bisnis            | HP            |
| `clinic-pos`         | Clinic Web POS Dashboard        | Browser       |
| `klinik-management`  | Klinik Management               | Browser       |
| `online-shop`        | Online Shop                     | Browser       |
| `swimming-ticketing` | Swimming Ticketing              | Browser       |
| `pos-resto`          | POS Resto                       | Browser       |
| `siakad`             | SIAKAD                          | Browser       |
| `cbt-tpa`            | CBT Test Potensi Akademik       | Browser       |
| `pos-umkm`           | POS untuk UMKM                  | Browser       |
| `pos-cafe`           | POS Cafe System                 | Browser       |
| `general-pos`        | General POS System (API)        | Browser (mis. halaman dokumentasi API) |

Project baru: nama slug sama dengan nama folder di `D:\Dev\portofolio\project\<slug>\`.

## Cara mengambil screenshot

**Flutter (HP/emulator tersambung):**

```
flutter screenshot -o shot.png
# atau lewat adb:
adb exec-out screencap -p > shot.png
```

Jalankan aplikasi, buka layar yang diinginkan, ambil screenshot, ulangi untuk
tiap layar. Gunakan data contoh yang rapi, tanpa data pribadi asli.

**Web app:** buka aplikasi di browser dengan jendela berukuran 1600×1000
(DevTools → Device Toolbar → Responsive 1600×1000), lalu klik menu ⋮ →
"Capture screenshot".

## Mengubah PNG/JPG menjadi WebP

Dengan Python + Pillow (`pip install pillow`):

```
python -c "from PIL import Image; Image.open('shot.png').save('cover.webp', quality=82)"
```

Atau dengan `cwebp` (libwebp): `cwebp -q 82 shot.png -o cover.webp`.

Bisa juga di squoosh.app (gratis, di browser).

## Mengecek hasilnya

Dari folder `D:\Dev\portofolio`, jalankan `python -m http.server 8765`, lalu buka
`http://localhost:8765/projects/` dan `http://localhost:8765/project/<slug>/`.

## Aturan untuk agen/asisten yang mengisi folder ini

- Hanya tambah/ganti file gambar di `img/projects/<slug>/`. Jangan mengubah
  HTML, CSS, atau JS portofolio.
- Jangan commit di repo portofolio. Pemilik repo yang meninjau dan commit.
