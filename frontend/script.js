const API = 'https://lab3web-jnk4.onrender.com/tasks';

const list = document.getElementById('task-list');
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');

// Hiển thị danh sách task
async function loadTasks() {
  try {
    const res = await fetch(API);
    const tasks = await res.json();
    list.innerHTML = '';

    if (tasks.length === 0) {
      list.innerHTML = '<li style="text-align: center; color: gray;">No tasks found</li>';
      return;
    }

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = task.status === 'completed' ? 'completed' : '';
      li.innerHTML = `
  ${task.title || task.description || '(No title)'}
  <span>
    ${!task.completed ? `<button onclick="completeTask('${task._id}')">✔</button>` : ''}
    <button onclick="deleteTask('${task._id}')">🗑</button>
        </span>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("❌ loadTasks error:", err);
  }
}

// Thêm task mới
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }) 
  });

  input.value = '';
  loadTasks();
});

// Đánh dấu hoàn thành
async function completeTask(id) {
  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'completed' })
  });
  loadTasks();
}

// Xoá task
async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadTasks();
}

// Gọi lần đầu
loadTasks();
