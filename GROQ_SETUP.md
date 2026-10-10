# Get Your FREE Groq API Key

Groq provides **FREE, FAST** AI inference - perfect for hackathons! No credit card required.

## 🚀 Quick Setup (2 Minutes)

### Step 1: Sign Up for Groq

1. **Go to:** https://console.groq.com/
2. **Click "Sign Up"** or "Get Started"
3. **Sign up with Google/GitHub** (easiest) or email
4. **No credit card required!** ✅

### Step 2: Create an API Key

1. After signing in, go to: **https://console.groq.com/keys**
2. Click **"Create API Key"**
3. Give it a name: `MindfulAI-Hackathon`
4. Click **"Submit"**
5. **Copy the key** (starts with `gsk_`)

### Step 3: Add to Your Deployed App

Run this command with your Groq API key:

```bash
# Replace gsk_... with your actual Groq API key
echo 'gsk_YOUR_KEY_HERE' | npx vercel env add GROQ_API_KEY production

# Also add to preview
echo 'gsk_YOUR_KEY_HERE' | npx vercel env add GROQ_API_KEY preview
```

### Step 4: Redeploy

```bash
npx vercel --prod --yes
```

**That's it!** Your app will now use FREE Groq AI! 🎉

---

## ✨ Why Groq is Great for Hackathons

✅ **100% FREE** - No credit card needed  
✅ **Super Fast** - Up to 750 tokens/second  
✅ **High Quality** - Uses Llama 3.1 70B (similar to GPT-4)  
✅ **Generous Limits** - 30 requests/minute, plenty for demos  
✅ **No Billing Surprises** - Completely free tier  

---

## 📊 Groq vs OpenAI

| Feature | Groq (FREE) | OpenAI (Paid) |
|---------|-------------|---------------|
| Cost | $0 | $0.01-0.05/chat |
| Speed | ⚡ Ultra Fast | Fast |
| Quality | Excellent | Excellent |
| Limits | 30 req/min | Pay as you go |
| Setup | 2 minutes | Need credit card |

**For hackathons: Groq is perfect!** ✅

---

## 🔗 Helpful Links

- **Groq Console:** https://console.groq.com/
- **API Keys:** https://console.groq.com/keys
- **Documentation:** https://console.groq.com/docs
- **Pricing (FREE!):** https://wow.groq.com/pricing/

---

## 🆘 Troubleshooting

**Can't sign up?**
- Try incognito mode
- Use Google or GitHub login
- Clear browser cache

**Key not working?**
- Make sure you copied the full key (starts with `gsk_`)
- Check you added it to Vercel (production AND preview)
- Redeploy after adding the key

---

**You're now using FREE AI! No more billing worries! 🎉**
