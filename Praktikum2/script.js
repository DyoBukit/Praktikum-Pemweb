// script.js - Personal Dashboard
// Memenuhi persyaratan: let/const, arrow functions, template literals, async/await, classes

// ---- Utilities (arrow functions) ----
const q = (sel) => document.querySelector(sel);
const createEl = (tag) => document.createElement(tag);
const formatDate = (d) => {
  if (!d) return '';
  const date = new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`;
};

// ---- UI Elements ----
const clockEl = q('#clock');

// ======================================
//  FIX: Semua fungsi render diletakkan di atas
// ======================================

// ---- Rendering ----
const renderTasks = () => {
  const all = tasks.getAll();
  const qText = taskSearch.value.trim().toLowerCase();
  const filter = taskFilter.value;

  const filtered = all
    .filter((t) => {
      if (filter === 'pending') return !t.completed;
      if (filter === 'completed') return t.completed;
      if (filter === 'important') return t.priority === 'important';
      return true;
    })
    .filter((t) => t.title.toLowerCase().includes(qText));

  taskList.innerHTML = filtered
    .map((t) => {
      const cls = `${t.completed ? 'completed' : ''} ${
        t.priority === 'important' ? 'important' : ''
      }`;
      return `
      <li class="${cls}" data-id="${t.id}">
        <div class="item-left">
          <strong>${t.title}</strong>
          <small>Deadline: ${formatDate(t.due)}</small>
        </div>
        <div class="item-actions">
          <button class="btn small" data-action="toggle">${t.completed ? 'Undo' : 'Done'}</button>
          <button class="btn small" data-action="edit">Edit</button>
          <button class="btn small danger" data-action="del">Hapus</button>
        </div>
      </li>
    `;
    })
    .join('');

  attachTaskListeners();
};

const attachTaskListeners = () => {
  taskList.querySelectorAll('li').forEach((li) => {
    const id = li.dataset.id;

    li.querySelector('[data-action="toggle"]').onclick = () => {
      const t = tasks.tasks.find((x) => x.id === id);
      tasks.updateTask(id, { completed: !t.completed });
    };

    li.querySelector('[data-action="edit"]').onclick = () => {
      const t = tasks.tasks.find((x) => x.id === id);
      const newTitle = prompt('Edit judul tugas:', t.title);
      const newDue = prompt('Edit deadline (YYYY-MM-DD):', t.due);
      if (newTitle !== null && newDue !== null) {
        tasks.updateTask(id, { title: newTitle.trim() || t.title, due: newDue || t.due });
      }
    };

    li.querySelector('[data-action="del"]').onclick = () => {
      if (confirm('Hapus tugas ini?')) tasks.removeTask(id);
    };
  });
};

const renderNotes = () => {
  const all = notes.getAll();

  notesList.innerHTML = all
    .map((n) => {
      return `
      <li data-id="${n.id}">
        <div class="item-left">
          <strong>${n.title}</strong>
          <small>${new Date(n.created).toLocaleString()}</small>
          <div>${n.body ? `<em>${n.body.substring(0, 120)}</em>` : '<em>(kosong)</em>'}</div>
        </div>
        <div class="item-actions">
          <button class="btn small" data-action="view">View</button>
          <button class="btn small" data-action="del">Hapus</button>
        </div>
      </li>
    `;
    })
    .join('');

  notesList.querySelectorAll('li').forEach((li) => {
    const id = li.dataset.id;

    li.querySelector('[data-action="view"]').onclick = () => {
      const n = notes.notes.find((x) => x.id === id);
      const newBody = prompt('Edit isi catatan:', n.body || '');
      if (newBody !== null) notes.updateNote(id, { body: newBody });
    };

    li.querySelector('[data-action="del"]').onclick = () => {
      if (confirm('Hapus catatan?')) notes.removeNote(id);
    };
  });
};

const renderSched = () => {
  const all = sched.getAll();

  schedList.innerHTML = all
    .map((s) => {
      const when = new Date(s.time);
      return `
      <li data-id="${s.id}">
        <div class="item-left">
          <strong>${s.title}</strong>
          <small>${when.toLocaleString()}</small>
        </div>
        <div class="item-actions">
          <button class="btn small" data-action="del">Hapus</button>
        </div>
      </li>
    `;
    })
    .join('');

  schedList.querySelectorAll('li').forEach((li) => {
    const id = li.dataset.id;
    li.querySelector('[data-action="del"]').onclick = () => {
      if (confirm('Hapus jadwal?')) sched.remove(id);
    };
  });
};

const updateClock = () => {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  clockEl.textContent = `${hh}:${mm}:${ss}`;
};

const renderAll = () => {
  renderTasks();
  renderNotes();
  renderSched();
  updateClock();
};

// Clock interval
setInterval(updateClock, 1000);

// ======================================
//  Classes — DIBAWAH fungsi render
// ======================================

class StorageManager {
  constructor(key) {
    this.key = key;
  }
  load = () => JSON.parse(localStorage.getItem(this.key) || '[]');
  save = (arr) => localStorage.setItem(this.key, JSON.stringify(arr));
}

class TaskManager {
  constructor() {
    this.storage = new StorageManager('pd_tasks');
    this.tasks = this.storage.load();
  }

  addTask = (task) => {
    this.tasks.push(task);
    this._commit();
  };

  updateTask = (id, patch) => {
    this.tasks = this.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t));
    this._commit();
  };

  removeTask = (id) => {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this._commit();
  };

  getAll = () =>
    this.tasks.slice().sort((a, b) => a.completed - b.completed || (a.priority === 'important' ? -1 : 1));

  _commit = () => {
    this.storage.save(this.tasks);
    renderAll();
  };
}

class NoteManager {
  constructor() {
    this.storage = new StorageManager('pd_notes');
    this.notes = this.storage.load();
  }
  addNote = (note) => {
    this.notes.push(note);
    this._commit();
  };
  updateNote = (id, patch) => {
    this.notes = this.notes.map((n) => (n.id === id ? { ...n, ...patch } : n));
    this._commit();
  };
  removeNote = (id) => {
    this.notes = this.notes.filter((n) => n.id !== id);
    this._commit();
  };
  getAll = () => this.notes.slice().reverse();
  _commit = () => {
    this.storage.save(this.notes);
    renderAll();
  };
}

class ScheduleManager {
  constructor() {
    this.storage = new StorageManager('pd_sched');
    this.sched = this.storage.load();
  }
  add = (e) => {
    this.sched.push(e);
    this._commit();
  };
  remove = (id) => {
    this.sched = this.sched.filter((s) => s.id !== id);
    this._commit();
  };
  getAll = () => this.sched.slice().sort((a, b) => new Date(a.time) - new Date(b.time));
  _commit = () => {
    this.storage.save(this.sched);
    renderAll();
  };
}

// ======================================
// Instances (SETELAH SEMUA RENDER SIAP)
// ======================================

const tasks = new TaskManager();
const notes = new NoteManager();
const sched = new ScheduleManager();

// ---- UI Elements (baru bisa digunakan setelah HTML ready) ----
const taskForm = q('#taskForm');
const taskTitle = q('#taskTitle');
const taskDue = q('#taskDue');
const taskPriority = q('#taskPriority');
const taskList = q('#taskList');
const taskSearch = q('#taskSearch');
const taskFilter = q('#taskFilter');

const noteForm = q('#noteForm');
const noteTitle = q('#noteTitle');
const noteBody = q('#noteBody');
const notesList = q('#notesList');

const schedForm = q('#scheduleForm');
const schedTitle = q('#schedTitle');
const schedTime = q('#schedTime');
const schedList = q('#schedList');

// ---- Event handlers ----

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskTitle.value.trim();
  const due = taskDue.value;
  const priority = taskPriority.value;

  if (!title || !due) {
    alert('Isi judul dan deadline!');
    return;
  }

  const newTask = {
    id: Date.now().toString(),
    title,
    due,
    priority,
    completed: false,
  };

  tasks.addTask(newTask);
  taskForm.reset();
});

taskSearch.addEventListener('input', renderTasks);
taskFilter.addEventListener('change', renderTasks);

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const t = noteTitle.value.trim();
  const b = noteBody.value.trim();
  if (!t && !b) {
    alert('Tambahkan judul atau isi catatan');
    return;
  }
  const note = {
    id: Date.now().toString(),
    title: t || 'Tanpa Judul',
    body: b,
    created: new Date().toISOString(),
  };
  notes.addNote(note);
  noteForm.reset();
  noteBody.value = '';
});

schedForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = schedTitle.value.trim();
  const time = schedTime.value;
  if (!title || !time) {
    alert('Isi kegiatan dan waktu!');
    return;
  }
  sched.add({ id: Date.now().toString(), title, time });
  schedForm.reset();
});

// ---- Async: Fetch Cuaca Real-time ----

// mapping kode cuaca → deskripsi
const weatherCodeMap = {
  0: "Langit cerah",
  1: "Cerah sebagian",
  2: "Berawan sebagian",
  3: "Mendung",
  45: "Berkabut",
  48: "Kabut membeku",
  51: "Gerimis ringan",
  53: "Gerimis sedang",
  55: "Gerimis lebat",
  61: "Hujan ringan",
  63: "Hujan sedang",
  65: "Hujan deras",
  71: "Salju ringan",
  73: "Salju sedang",
  75: "Salju lebat",
  95: "Badai petir",
};

// fungsi async ambil cuaca
const fetchWeather = async (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("Gagal mengambil cuaca!");

  const data = await res.json();
  return data.current_weather;
};

// ambil lokasi + cuaca
const loadWeatherInfo = async () => {
  asyncInfo.textContent = "Mengambil lokasi...";

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          asyncInfo.textContent = "Mengambil cuaca...";
          const weather = await fetchWeather(lat, lon);

          resolve({
            temp: weather.temperature,
            wind: weather.windspeed,
            code: weather.weathercode,
          });
        } catch (err) {
          reject(err);
        }
      },
      () => reject(new Error("Izin lokasi ditolak"))
    );
  });
};

// event tombol
loadInfoBtn.addEventListener("click", async () => {
  loadInfoBtn.disabled = true;
  asyncInfo.textContent = "Memuat cuaca...";

  try {
    const info = await loadWeatherInfo();
    asyncInfo.innerHTML = `
      <strong>Cuaca Saat Ini:</strong><br>
      Suhu: ${info.temp}°C <br>
      Angin: ${info.wind} km/h <br>
      Kondisi: ${weatherCodeMap[info.code] || "Tidak diketahui"}
    `;
  } catch (err) {
    asyncInfo.innerHTML = `<span style="color:red;">${err.message}</span>`;
  } finally {
    loadInfoBtn.disabled = false;
  }
});


// ---- Initial render ----
document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  (async () => {
    const t = tasks.getAll();
    if (t.length === 0) {
      await new Promise((r) => setTimeout(r, 300));
      tasks.addTask({
        id: 's1',
        title: 'Praktikum IF',
        due: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
        priority: 'important',
        completed: false,
      });

      notes.addNote({
        id: 'n1',
        title: 'Outline Laporan',
        body: 'Jangan lupa struktur: Pendahuluan, Metode, Hasil, Kesimpulan',
        created: new Date().toISOString(),
      });

      sched.add({
        id: 'sc1',
        title: 'KULIAH AI',
        time: new Date(Date.now() + 2 * 86400000).toISOString(),
      });
    }
  })();
});
