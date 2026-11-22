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
| `icon.webp`    | Ikon aplikasi di beranda (ikon melayang di hero dan daftar "N more projects") |

Project yang punya **website dan aplikasi mobile** (saat ini `ourmoney`) memakai
file di atas untuk aplikasi mobile (portrait, bingkai HP), ditambah file
website (lanskap 1600×1000, bingkai browser):

| File                  | Dipakai untuk                                                         |
|-----------------------|-----------------------------------------------------------------------|
| `web-cover.webp`      | Bingkai browser di tile beranda + gambar pertama galeri "Website"     |
| `web-shot-1.webp` … `web-shot-4.webp` | Galeri "Website" di halaman detail                    |

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
- **Ikon (`icon.webp`)**: persegi **512×512**, ikon launcher asli aplikasi,
  full-bleed tanpa sudut membulat dan tanpa bayangan (situs sudah memberi
  sudut membulat). Selama belum ada, situs menampilkan ikon generik.
- Ukuran file usahakan di bawah ±300 KB per gambar (ikon cukup ±50 KB).

## Daftar slug

| Slug                 | Project                         | Jenis bingkai |
|----------------------|---------------------------------|---------------|
| `warung-tycoon`      | Warung Tycoon                   | HP (game)     |
| `tropimori`          | Tropimori: Cozy Island Farm     | HP (game)     |
| `cabinet80s`         | Cabinet80s: Offline Retro Game  | HP (game)     |
| `ginger-logic`       | Ginger Logic: Cute Cat Puzzle   | HP (game)     |
| `tasbihgo`           | TasbihGo - Tasbih & Dzikir      | HP            |
| `nusa-tasks`         | Nusa Tasks: Daily Planner       | HP            |
| `ourmoney`           | OurMoney: Plan Your Money       | HP (app) + Browser (website, file `web-*`) |
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

Project baru: nama slug sama dengan nama folder halaman detailnya, `D:\Dev\portofolio\<slug>\`
(halaman tampil di `https://yoluvy.my.id/<slug>/`).

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
`http://localhost:8765/projects/` dan `http://localhost:8765/<slug>/`.

## Tema halaman

Warna halaman detail tiap project (latar, kartu, teks, tombol, aksen) diatur di
`D:\Dev\portofolio\css\project-themes.css`, satu blok per slug. Screenshot
tidak perlu disesuaikan dengan tema. Ambil saja tampilan asli aplikasinya.

## Prompt siap pakai

Tempel prompt di bawah apa adanya di sesi Claude Code yang terbuka di repo
project itu sendiri (bukan di repo portofolio). Sesi itu mengerjakan semuanya
sampai commit dan push di repo portofolio tanpa menunggu persetujuan, jadi
tidak perlu kembali ke sesi portofolio. Hasilnya tinggal dicek di situs live.
Kalau mau cover tertentu, tambahkan satu kalimat di akhir, misalnya
"Cover-nya gameplay suasana kebun dan pulau."

```
Tugas ini untuk repo portofolio saya di D:\Dev\portofolio. Baca dulu
D:\Dev\portofolio\CLAUDE.md dan D:\Dev\portofolio\img\projects\README.md,
lalu ikuti aturannya, termasuk "Aturan untuk agen/asisten" di README.

1. Cocokkan project ini dengan tabel "Daftar slug" di README untuk menentukan
   slug dan jenis bingkainya (HP atau Browser). Kalau tidak ada yang cocok,
   tanya saya dulu.
2. Jalankan project ini dan ambil 5 screenshot asli sesuai bagian "Ukuran":
   - cover.webp: layar yang langsung menunjukkan daya tarik utama produk.
   - shot-1.webp sampai shot-4.webp: 4 fitur yang berbeda. shot-1 dan shot-2
     juga tampil di samping cover di kartu (untuk app/game), jadi taruh dua
     yang paling menarik di sana.
3. Ambil ikon aplikasinya sebagai icon.webp 512×512 tanpa sudut membulat:
   untuk app/game dari ikon launcher (android/app/src/main/res atau assets),
   untuk web app dari logo/favicon-nya. Kalau tidak ada ikon yang cukup
   besar, lewati saja.
4. Pertahankan warna dan tampilan asli, pakai data contoh yang rapi tanpa data
   pribadi asli. Ekspor ke .webp (di bawah ±300 KB per file, ikon ±50 KB) dan
   simpan di D:\Dev\portofolio\img\projects\<slug>\.
5. Cek hasilnya seperti di bagian "Mengecek hasilnya": cover dan ikon tampil di
   beranda dan /projects/, galeri tampil di halaman /<slug>/.
6. Langsung commit dan push di repo portofolio (git -C D:\Dev\portofolio),
   tanpa menunggu persetujuan saya: hanya file di img/projects/<slug>/,
   langsung ke main, author tetap identitas git saya, tanpa trailer
   co-author atau tanda bot. Lalu beri saya daftar file yang masuk, hash
   commit, dan link https://yoluvy.my.id/<slug>/ untuk dicek.
```

## Aturan untuk agen/asisten yang mengisi folder ini

- Hanya tambah/ganti file gambar di `img/projects/<slug>/`. Jangan mengubah
  HTML, CSS, atau JS portofolio.
- Commit hanya file gambar di `img/projects/<slug>/`, satu commit per project,
  langsung di `main` repo portofolio, dengan pesan seperti
  `feat: add <slug> screenshots and icon`. Untuk alur ini pemilik repo sudah
  mengizinkan commit dan push ke `main` tanpa menunggu persetujuan (pengecualian
  dari aturan "Commit" di `D:\Dev\portofolio\CLAUDE.md`). Aturan lainnya tetap:
  author tetap identitas git pemilik repo, tanpa trailer co-author atau tanda
  bot apa pun.
- Jangan ikut meng-commit perubahan lain yang kebetulan ada di repo portofolio
  (cek `git -C D:\Dev\portofolio status` dulu).
