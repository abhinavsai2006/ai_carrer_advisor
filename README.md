# 🚀 AI-Powered Career & Skills Advisor

An interactive web application that uses **Google Gemini AI** to generate **personalized career recommendations** based on a user’s **skills** and **personality traits**.  

This project provides students and professionals with **data-driven career insights**, salary forecasts, skills gap analysis, and guided learning paths to improve employability.

---

## 📖 About the Project
The application helps users:
- 🧑‍💻 **Skills Assessment** – Rate your technical, analytical, and soft skills.  
- 🧠 **Personality Assessment** – Answer psychology-driven questions to understand work style.  
- 🤖 **Gemini AI Job Generation** – Fetch 6 trending jobs in India tailored to the user’s profile.  
- 📊 **Data Visualization** – View demand for top skills (radar chart) and industry trends (bar chart).  
- 💼 **Career Recommendations** – Explore job descriptions, required skills, salaries, and growth.  
- 📑 **PDF Report Export** – Download a professional summary of skills, personality, and top careers.  

This project bridges the **education-to-employment gap** by giving **personalized, AI-powered insights** instead of static recommendations.

---

## 🛠️ How to Use
1. **Start Assessment** → Begin the process with a landing page.  
2. **Rate Your Skills** → Select your proficiency (1–4) for multiple skill areas.  
3. **Answer Personality Questions** → Rate yourself on traits like openness, conscientiousness, adaptability, etc.  
4. **Generate Results** → AI (Gemini) creates **6 job cards** with salary, skills, and industry trends.  
5. **Explore Careers** →  
   - Click on a job to see **skills gap analysis** and **recommended learning paths**.  
   - Check **charts** of top skills and industry demand.  
6. **Download PDF** → Export your personalized career report.  
7. **Retake or Reset** → Users can restart the assessment anytime.  

---

## 📡 Tech Stack
- **Frontend:** Vanilla JS + HTML + CSS  
- **Backend (API calls):** Google Gemini API (generativelanguage/v1beta, model: `gemini-2.0-flash`)  
- **AI/ML:** Gemini generates JSON-formatted job cards and skills insights  
- **Charts:** Chart.js (Radar & Bar visualization)  
- **Export:** jsPDF for downloadable reports  

---

## 🔑 Key Features in Code
- **`fetchJobsFromGemini()`** – Calls Gemini API with custom prompts and parses JSON response.  
- **`CareerAdvisor` Class** – Manages assessments, recommendations, charts, and export.  
- **Event Listeners** – Interactive flow (skills → personality → results).  
- **Charts** – Dynamic Radar (Top Skills) & Bar Chart (Industry Trends).  
- **PDF Export** – Professionally formatted career report.  

---

## 🚀 Running the Project
1. Clone this repository:  
