# 🌐 Deploy Your Application Online

## Quick Deployment Guide

Your application is now on GitHub, but to run it online, you need to deploy it to a hosting platform.

---

## 🎯 Recommended: Deploy to Render (Easiest)

### Step 1: Deploy Backend

1. **Go to:** https://render.com
2. **Sign in** with your GitHub account
3. Click **"New +"** → **"Web Service"**
4. **Connect your GitHub repository:** `HashIndexed_Patient_Client_Record`
5. **Configure:**
   - **Name:** `hospital-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python app.py`
   - **Instance Type:** Free
6. **Add Environment Variables:**
   - `DB_HOST` = (your database host)
   - `DB_USER` = (your database user)
   - `DB_PASSWORD` = (your database password)
   - `DB_NAME` = `hospital_db`
7. Click **"Create Web Service"**

### Step 2: Get a Free Database

**Option A: Railway (Recommended)**
1. Go to: https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Provision MySQL"
4. Copy the connection details
5. Add them to Render environment variables

**Option B: PlanetScale (Free MySQL)**
1. Go to: https://planetscale.com
2. Create a free database
3. Get connection credentials
4. Add to Render

### Step 3: Deploy Frontend

1. **Go to:** https://vercel.com
2. **Sign in** with GitHub
3. Click **"New Project"**
4. **Import:** `HashIndexed_Patient_Client_Record`
5. **Configure:**
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. **Add Environment Variable:**
   - `VITE_API_URL` = (your Render backend URL)
7. Click **"Deploy"**

### Step 4: Update Frontend API URL

After deploying backend, update `frontend/src/services/api.js`:

```javascript
const API_URL = 'https://your-backend-url.onrender.com/api';
```

Then push to GitHub and Vercel will auto-redeploy.

---

## 🆓 Free Hosting Options

### Frontend Hosting (React)
- ✅ **Vercel** - Best for React (https://vercel.com)
- ✅ **Netlify** - Easy deployment (https://netlify.com)
- ✅ **GitHub Pages** - Free from GitHub
- ✅ **Cloudflare Pages** - Fast CDN

### Backend Hosting (Flask)
- ✅ **Render** - Easy Python hosting (https://render.com)
- ✅ **Railway** - Modern platform (https://railway.app)
- ✅ **PythonAnywhere** - Python-specific (https://pythonanywhere.com)
- ✅ **Fly.io** - Global deployment

### Database Hosting (MySQL)
- ✅ **Railway** - Free MySQL (https://railway.app)
- ✅ **PlanetScale** - Serverless MySQL (https://planetscale.com)
- ✅ **Aiven** - Free tier available (https://aiven.io)

---

## 📝 Quick Start: Render One-Click Deploy

1. Push the `render.yaml` file to GitHub:
   ```bash
   git add render.yaml
   git commit -m "Add Render deployment config"
   git push
   ```

2. Go to Render Dashboard
3. Click "New" → "Blueprint"
4. Connect your repository
5. Render will automatically detect `render.yaml`
6. Add your database credentials
7. Click "Apply"

---

## 🔧 Local Testing Before Deployment

Make sure your app works locally:

```bash
# Terminal 1: Backend
cd backend
python app.py

# Terminal 2: Frontend
cd frontend
npm run dev
```

Open: http://localhost:5173

---

## ⚠️ Important Notes

1. **Environment Variables:** Never commit `.env` file to GitHub
2. **Database:** You need a cloud MySQL database for online deployment
3. **CORS:** Make sure backend allows frontend domain
4. **API URL:** Update frontend to use deployed backend URL
5. **Free Tiers:** Most platforms have usage limits on free plans

---

## 🎯 Simplest Option: Use Replit

If you want the absolute easiest deployment:

1. Go to: https://replit.com
2. Import from GitHub
3. Replit will auto-detect and run your app
4. Get a public URL instantly

---

## 📞 Need Help?

- Check deployment logs for errors
- Ensure all environment variables are set
- Test API endpoints with Postman
- Check database connection

---

**Choose the option that works best for you!** 🚀

Most students use: **Vercel (Frontend) + Render (Backend) + Railway (Database)**
