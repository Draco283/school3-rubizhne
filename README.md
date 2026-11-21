# Гімназія №3 — сайт (RUBY HILL)

## Локальний запуск

```bash
cd "C:\Users\Daniil\Desktop\School 3"
npm install      # перший раз
npm run build    # збірка сайту
npm run serve    # відкрити http://localhost:4000/
```

## Публікація на Netlify (безкоштовно)

1. **GitHub**
   - Створіть новий репозиторій на GitHub з назвою `school3-rubizhne`.
   - Включіть *Initialize this repository with a README* — не важливо, ми все залишимо з нашим репозиторієм.
   - Після створення репозиторію в його сторінкі достатньо завантажити наші файли проекту.

2. **Налаштування файлів проекту**
   - Якщо у вас є Git, виконайте в папці проекту:
     ```bash
     git init
     git config user.name "Гімназія №3"
     git config user.email "school3rub@ukr.net"
     git add .
     git commit -m "Гімназія №3: будівниця сайту, новини, редакція"
     git remote add origin https://github.com/<ваш-логін>/school3-rubizhne.git
     git push -u origin main
     ```
   - Якщо немає Git — можна скопіювати всі файли з папки проекту на GitHub вручну (через веб-інтерфейс), набравши в новому репозиторії `school3-rubizhne`.

3. **Netlify**
   - Увійдіть на [netlify.com](https://app.netlify.com/) через GitHub.
   - *New site from Git* → виберіть репозиторій `school3-rubizhne` → **Deploy site**.
   - У налаштуваннях сайту:
     - *Deploy settings → Site settings → Deploy contexts* → натисніть **Edit**.
     - *Custom build command* → `npm run build` (якщо Netlify вже заповнив команду, перевірте, що вона виглядає як `npm run build` або `node build.js`).
     - *Published directory* → `.` (коренева папка).
   - Зачекайте першу публікацію. Адреса буде типу `https://<зазвичай-school3-rubizhne>.netlify.app` — якщо таке ім'я зайняте, змініть ім'я сайту у *Site settings → General → Site name*.

4. **Адреса в конфігурації**
   - Якщо Netlify-адреса вашого сайту не `school3-rubizhne.netlify.app` (наприклад, інший ім'я сайту), оновіть два місця:
     - `src/layout.js` — константа `SITE.url` (це базова адреса сайту).
     - `admin/config.yml` — `site_url:` і `display_url:` (базова адреса для CMS).

5. **Редакція на основі Decap CMS**
   - Вмикаємо Identity і Git Gateway:
     - *Netlify dashboard → Site settings → Identity → Enable Identity*.
     - *Netlify dashboard → Identity → Enable Git Gateway → Create account/Enable* (виберіть особу, яка буде мати права на редагування).
   - Тепер увійдіть в CMS: відкрийте `https://<адреса-вашого-сайту>/admin` → натисніть *Log in with Netlify Identity*.
   - Якщо хочете інших редакторів: *Netlify dashboard → Identity → Add user* (введіть email і надішліть їм листа з посиланням).
   - Якщо включено *Git Gateway*, редактори зможуть відразу редагувати новини через CMS без створення акаунтів на GitHub.

6. **Створення новини (для редакції)**
   - Відкрийте `/admin` → вкладка *News* → *New entry*.
   - Заповніть: Заголовок, Дату, Опис (short), Обкладинку (фото), Автор, Теги.
   - Натисніть *Save draft* → інший редактор перевірить → *Approve and publish*.
   - Після публікації сайт оновиться через Netlify (хвиля термін до пари хвилин).

## Локальний перегляд протягом роботи

Якщо ви хочете бачити зміни перед публікацією:

```bash
npm run serve   # http://localhost:4000/
```
