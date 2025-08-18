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

## 🌟 Improvements & Future Roadmap

- **User Authentication:** Allow users to save progress and access past reports.
- **Globalization:** Support for more countries and localized job market data.
- **Skill Courses:** Integration with MOOC providers (Coursera, Udemy, etc.) for learning paths.
- **More AI Models:** Experiment with other LLMs for diverse career suggestions.
- **Accessibility:** Enhanced UX for visually impaired users and mobile devices.
- **Admin Dashboard:** For analytics on popular careers, user engagement, etc.

---

## 📥 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abhinavsai2006/ai_carrer_advisor.git
   cd ai_carrer_advisor
   ```

2. **Open `index.html` in your browser**  
   *(No server required for basic functionality; API key required for Gemini integration)*

3. **Configure Gemini API key:**  
   - Set your Gemini API key in the relevant JS file or environment variable as needed.

---

## 🤝 Contributing

Contributions are welcome!  
Please open issues or submit pull requests for features, bug fixes, or improvements.

---

## 📄 License

This project is licensed under the MIT License.

---
