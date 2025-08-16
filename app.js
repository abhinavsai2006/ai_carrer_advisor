// Gemini AI integration for job card generation
async function fetchJobsFromGemini(prompt) {
    const apiKey = 'AIzaSyA1BTDZ5rVKOKTMSTw2oa4PSvsGdF8PtNk';
    // Use v1beta endpoint and gemini-2.0-flash model as per your curl example
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    const body = {
        contents: [{ parts: [{ text: prompt }] }]
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error('Gemini API error: ' + response.status + ' ' + response.statusText);
        }
        const data = await response.json();
        if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        }
        return null;
    } catch (err) {
        console.error('Gemini API error:', err);
        return { error: err.message };
    }
}
// AI Career & Skills Advisor Application

class CareerAdvisor {
    constructor() {
        this.currentStep = 0;
        this.userSkills = {};
        this.userPersonality = {};
        this.careerRecommendations = [];
        this.skillsChart = null;
        this.trendsChart = null;
        
    // Application data (careers removed, Gemini is now the source for jobs)
    this.data = {
            "skills_database": {
                "technical": [
                    "Programming", "Machine Learning", "Data Analysis", "Software Design", "Database Management",
                    "Cloud Computing", "Cybersecurity", "Web Development", "Mobile Development", "DevOps",
                    "Artificial Intelligence", "Blockchain", "UI/UX Design", "System Architecture", "Testing"
                ],
                "soft": [
                    "Communication", "Leadership", "Problem Solving", "Critical Thinking", "Creativity",
                    "Teamwork", "Adaptability", "Time Management", "Project Management", "Negotiation"
                ],
                "analytical": [
                    "Statistics", "Data Visualization", "Research", "Strategic Planning", "Financial Analysis",
                    "Market Research", "Risk Assessment", "Performance Analysis", "Quality Assurance"
                ]
            },
            "personality_questions": [
                { "question": "I enjoy exploring new ideas and concepts", "trait": "Openness" },
                { "question": "I pay attention to details in my work", "trait": "Conscientiousness" },
                { "question": "I feel energized when working with others", "trait": "Extraversion" },
                { "question": "I prefer helping others achieve their goals", "trait": "Agreeableness" },
                { "question": "I remain calm under pressure", "trait": "Emotional Stability" },
                { "question": "I like to think creatively about problems", "trait": "Openness" },
                { "question": "I am organized and methodical", "trait": "Conscientiousness" },
                { "question": "I enjoy being the center of attention", "trait": "Extraversion" },
                { "question": "I am sympathetic to others' feelings", "trait": "Agreeableness" },
                { "question": "I handle stress well", "trait": "Emotional Stability" }
            ]
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showLandingPage();
    }

    setupEventListeners() {
        // Use direct event binding approach
        const startBtn = document.getElementById('startAssessment');
        if (startBtn) {
            startBtn.onclick = () => {
                console.log('Start Assessment clicked');
                this.startSkillsAssessment();
            };
        }

        const nextBtn = document.getElementById('nextToPersonality');
        if (nextBtn) {
            nextBtn.onclick = () => {
                console.log('Next to Personality clicked');
                this.startPersonalityAssessment();
            };
        }

        const backBtn = document.getElementById('backToSkills');
        if (backBtn) {
            backBtn.onclick = () => {
                console.log('Back to Skills clicked');
                this.showSkillsAssessment();
            };
        }

        const generateBtn = document.getElementById('generateResults');
        if (generateBtn) {
            generateBtn.onclick = () => {
                console.log('Generate Results clicked');
                this.generateResults();
            };
        }

        const retakeBtn = document.getElementById('retakeAssessment');
        if (retakeBtn) {
            retakeBtn.onclick = () => {
                console.log('Retake Assessment clicked');
                this.resetAssessment();
            };
        }

        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.onclick = () => {
                console.log('Reset clicked');
                this.resetAssessment();
            };
        }

        const exportBtn = document.getElementById('exportResults');
        if (exportBtn) {
            exportBtn.textContent = 'Download Results';
            exportBtn.onclick = () => {
                console.log('Download Results clicked');
                this.downloadResultsPDF();
            };
        }

        const modalClose = document.getElementById('modalClose');
        if (modalClose) {
            modalClose.onclick = () => this.closeModal();
        }

        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            modalOverlay.onclick = () => this.closeModal();
        }

        console.log('Event listeners setup complete');
    }

    showLandingPage() {
        console.log('Showing landing page');
        this.hideAllSections();
        const landingPage = document.getElementById('landingPage');
        const progressContainer = document.getElementById('progressContainer');
        
        if (landingPage) {
            landingPage.classList.remove('hidden');
        }
        if (progressContainer) {
            progressContainer.style.display = 'none';
        }
    }

    startSkillsAssessment() {
        console.log('Starting skills assessment');
        this.currentStep = 1;
        this.updateProgress();
        this.hideAllSections();
        
        const skillsAssessment = document.getElementById('skillsAssessment');
        const progressContainer = document.getElementById('progressContainer');
        
        if (skillsAssessment) {
            skillsAssessment.classList.remove('hidden');
            console.log('Skills assessment section shown');
        }
        if (progressContainer) {
            progressContainer.style.display = 'block';
        }
        
        this.renderSkillsAssessment();
    }

    startPersonalityAssessment() {
        console.log('Starting personality assessment');
        this.currentStep = 2;
        this.updateProgress();
        this.hideAllSections();
        
        const personalityAssessment = document.getElementById('personalityAssessment');
        if (personalityAssessment) {
            personalityAssessment.classList.remove('hidden');
        }
        
        this.renderPersonalityAssessment();
    }

    showSkillsAssessment() {
        this.currentStep = 1;
        this.updateProgress();
        this.hideAllSections();
        
        const skillsAssessment = document.getElementById('skillsAssessment');
        if (skillsAssessment) {
            skillsAssessment.classList.remove('hidden');
        }
    }

    async generateResults() {
        console.log('Generating results (Gemini AI)');
        this.currentStep = 3;
        this.updateProgress();

        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) {
            loadingSpinner.classList.remove('hidden');
        }

        // Gather user skills and personality for prompt
        const userSkills = Object.entries(this.userSkills)
            .filter(([_, level]) => level > 0)
            .map(([skill, level]) => `${skill} (level ${level}/4)`)
            .join(', ');
        const userPersonality = Object.entries(this.userPersonality)
            .map(([trait, arr]) => {
                const avg = arr && arr.length ? (arr.reduce((a, b) => a + (b || 0), 0) / arr.length).toFixed(2) : 'N/A';
                return `${trait}: ${avg}/5`;
            })
            .join(', ');

        // Personalized Gemini prompt
        const prompt = `Given the following user's skills and personality traits, generate a JSON array of 6 personalized trending technology jobs in India that best match the user's profile. For each job, include: title, industry, description, avg_salary_inr (as a number), key_skills (array of 4-6), and a short growth_trend (1 sentence). Respond ONLY with a valid JSON array, no extra text.\n\nUser Skills: ${userSkills || 'N/A'}\nUser Personality: ${userPersonality || 'N/A'}\n\nExample:\n[
          {"title": "Software Engineer", "industry": "Technology", "description": "...", "avg_salary_inr": 1200000, "key_skills": ["JavaScript", "React", "Node.js"], "growth_trend": "Demand is rising due to digital transformation."},
          ...
        ]`;

        let jobs = [];
        let geminiResponse = null;
        let geminiError = null;
        try {
            geminiResponse = await fetchJobsFromGemini(prompt);
            if (geminiResponse && geminiResponse.error) {
                geminiError = geminiResponse.error;
                console.error('Gemini API error:', geminiError);
            } else if (geminiResponse) {
                console.log('Gemini raw response:', geminiResponse);
                // Try to parse JSON from Gemini's response
                const jsonStart = geminiResponse.indexOf('[');
                const jsonEnd = geminiResponse.lastIndexOf(']') + 1;
                const jsonString = geminiResponse.substring(jsonStart, jsonEnd);
                jobs = JSON.parse(jsonString);
            }
        } catch (e) {
            geminiError = e.message;
            console.error('Failed to parse Gemini jobs:', e, geminiResponse);
        }

        this.careerRecommendations = Array.isArray(jobs) ? jobs.map(job => ({
            title: job.title,
            industry: job.industry,
            description: job.description,
            avg_salary_inr: '₹' + (job.avg_salary_inr ? job.avg_salary_inr.toLocaleString('en-IN') : 'N/A'),
            skills: job.key_skills || [],
            growth_trend: job.growth_trend || ''
        })) : [];

        this.hideAllSections();
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
        }
        if (loadingSpinner) {
            loadingSpinner.classList.add('hidden');
        }
        // Show error to user if API call failed
        if (geminiError) {
            const matchesContainer = document.getElementById('careerMatches');
            if (matchesContainer) {
                matchesContainer.innerHTML = `<div class='no-jobs-msg'>Gemini API error: ${geminiError}</div>`;
            }
        } else {
            this.renderResults();
        }
    }

    hideAllSections() {
        const sections = [
            'landingPage',
            'skillsAssessment', 
            'personalityAssessment',
            'resultsSection'
        ];
        
        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('hidden');
            }
        });
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (!progressFill || !progressText) return;
        
        const steps = ['Skills Assessment', 'Personality Assessment', 'Career Recommendations'];
        const progress = (this.currentStep / 3) * 100;
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Step ${this.currentStep} of 3: ${steps[this.currentStep - 1]}`;
    }

    renderSkillsAssessment() {
        console.log('Rendering skills assessment');
        const skillsGrid = document.getElementById('skillsGrid');
        if (!skillsGrid) {
            console.error('Skills grid not found');
            return;
        }
        
        skillsGrid.innerHTML = '';

        Object.entries(this.data.skills_database).forEach(([category, skills]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category';
            categoryDiv.innerHTML = `
                <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Skills</h3>
                ${skills.map(skill => `
                    <div class="skill-item">
                        <span class="skill-name">${skill}</span>
                        <div class="skill-rating" data-skill="${skill}">
                            ${[1, 2, 3, 4].map(level => `
                                <button class="rating-btn" data-level="${level}" type="button">${level}</button>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            `;
            skillsGrid.appendChild(categoryDiv);
        });

        // Add event listeners for rating buttons
        skillsGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('rating-btn')) {
                const skill = e.target.closest('.skill-rating').dataset.skill;
                const level = parseInt(e.target.dataset.level);
                
                console.log(`Rating skill: ${skill}, level: ${level}`);
                
                // Update visual state
                const ratingContainer = e.target.closest('.skill-rating');
                ratingContainer.querySelectorAll('.rating-btn').forEach(button => {
                    button.classList.remove('active');
                });
                
                for (let i = 1; i <= level; i++) {
                    const levelBtn = ratingContainer.querySelector(`[data-level="${i}"]`);
                    if (levelBtn) {
                        levelBtn.classList.add('active');
                    }
                }
                
                // Store skill rating
                this.userSkills[skill] = level;
                this.checkSkillsCompletion();
            }
        });

        console.log('Skills assessment rendered');
    }

    checkSkillsCompletion() {
        const allSkills = [
            ...this.data.skills_database.technical,
            ...this.data.skills_database.soft,
            ...this.data.skills_database.analytical
        ];
        
        const ratedSkills = Object.keys(this.userSkills).length;
        const nextBtn = document.getElementById('nextToPersonality');
        
        console.log(`Rated skills: ${ratedSkills}/${allSkills.length}`);
        
        if (nextBtn && ratedSkills >= Math.floor(allSkills.length * 0.3)) {
            nextBtn.disabled = false;
            console.log('Next button enabled');
        }
    }

    renderPersonalityAssessment() {
        console.log('Rendering personality assessment');
        const questionsContainer = document.getElementById('personalityQuestions');
        if (!questionsContainer) return;
        
        questionsContainer.innerHTML = '';

        this.data.personality_questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-card';
            questionDiv.innerHTML = `
                <div class="question-text">${q.question}</div>
                <div class="likert-scale">
                    <div class="likert-label">Strongly<br>Disagree</div>
                    <div class="likert-options" data-question="${index}">
                        ${[1, 2, 3, 4, 5].map(value => `
                            <button class="likert-btn" data-value="${value}" type="button">${value}</button>
                        `).join('')}
                    </div>
                    <div class="likert-label">Strongly<br>Agree</div>
                </div>
            `;
            questionsContainer.appendChild(questionDiv);
        });

        // Add event listeners for likert buttons
        questionsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('likert-btn')) {
                const questionIndex = e.target.closest('.likert-options').dataset.question;
                const value = parseInt(e.target.dataset.value);
                const trait = this.data.personality_questions[questionIndex].trait;
                
                console.log(`Answered question ${questionIndex}: ${value} for trait ${trait}`);
                
                // Update visual state
                const likertContainer = e.target.closest('.likert-options');
                likertContainer.querySelectorAll('.likert-btn').forEach(button => {
                    button.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Store personality response
                if (!this.userPersonality[trait]) {
                    this.userPersonality[trait] = [];
                }
                this.userPersonality[trait][questionIndex] = value;
                this.checkPersonalityCompletion();
            }
        });

        console.log('Personality assessment rendered');
    }

    checkPersonalityCompletion() {
        const answeredQuestions = Object.values(this.userPersonality)
            .flat()
            .filter(val => val !== undefined).length;
        
        const generateBtn = document.getElementById('generateResults');
        
        console.log(`Answered questions: ${answeredQuestions}/${this.data.personality_questions.length}`);
        
        if (generateBtn && answeredQuestions >= this.data.personality_questions.length) {
            generateBtn.disabled = false;
            console.log('Generate button enabled');
        }
    }

    calculateCareerMatches() {
        // Conversion rate: 1 USD = 83 INR
        const usdToInr = 83;
        this.careerRecommendations = this.data.careers.map(career => {
            let skillsScore = this.calculateSkillsMatch(career);
            let personalityScore = this.calculatePersonalityMatch(career);

            // Convert avg_salary to INR (extract number, multiply, format)
            let salaryNum = 0;
            if (career.avg_salary && career.avg_salary.startsWith('$')) {
                salaryNum = parseInt(career.avg_salary.replace(/[$,]/g, ''));
            }
            let inrSalary = '';
            if (salaryNum > 0) {
                const rupees = salaryNum * usdToInr;
                inrSalary = '₹' + rupees.toLocaleString('en-IN');
            } else {
                inrSalary = career.avg_salary;
            }

            // Weight: 60% skills, 40% personality
            let overallScore = (skillsScore * 0.6) + (personalityScore * 0.4);

            return {
                ...career,
                skillsMatch: Math.round(skillsScore),
                personalityMatch: Math.round(personalityScore),
                overallMatch: Math.round(overallScore),
                avg_salary_inr: inrSalary
            };
        });

        // Sort by overall match descending
        this.careerRecommendations.sort((a, b) => b.overallMatch - a.overallMatch);
    }

    calculateSkillsMatch(career) {
        const careerSkills = career.skills;
        let totalMatch = 0;
        let skillCount = 0;

        careerSkills.forEach(skill => {
            if (this.userSkills[skill]) {
                totalMatch += this.userSkills[skill] * 25; // Convert 1-4 scale to percentage
                skillCount++;
            }
        });

        return skillCount > 0 ? totalMatch / skillCount : 50; // Default to 50% if no matching skills
    }

    calculatePersonalityMatch(career) {
        const personalityScores = Object.values(this.userPersonality).flat().filter(v => v !== undefined);
        if (personalityScores.length === 0) return 60;
        
        const avgPersonality = personalityScores.reduce((a, b) => a + b, 0) / personalityScores.length;
        
        // Convert 1-5 scale to percentage, with some randomization for demo
        return Math.min(100, Math.max(40, (avgPersonality * 20) + (Math.random() * 20 - 10)));
    }

    renderResults() {
        console.log('Rendering results');
        this.renderCareerMatches();
        this.renderSkillsChartFromGemini();
        this.renderTrendsChartFromGemini();
    }

    renderCareerMatches() {
        const matchesContainer = document.getElementById('careerMatches');
        if (!matchesContainer) return;
        
        matchesContainer.innerHTML = '';

        // Show all Gemini jobs
        const topMatches = this.careerRecommendations;

        if (!topMatches || topMatches.length === 0) {
            const noJobsMsg = document.createElement('div');
            noJobsMsg.className = 'no-jobs-msg';
            noJobsMsg.textContent = 'No job recommendations available at this time. Please try again later.';
            matchesContainer.appendChild(noJobsMsg);
            return;
        }

        topMatches.forEach(career => {
            const careerCard = document.createElement('div');
            careerCard.className = 'career-card';
            careerCard.innerHTML = `
                <div class="career-header">
                    <h3 class="career-title">${career.title}</h3>
                </div>
                <div class="career-industry">${career.industry}</div>
                <p class="career-description">${career.description}</p>
                <div class="career-stats">
                    <div class="career-stat">
                        <span class="stat-label">Average Salary</span>
                        <span class="stat-value">${career.avg_salary_inr} <span style='font-size:12px;'>(INR)</span></span>
                    </div>
                </div>
                <div class="career-skills">
                    <strong>Key Skills:</strong>
                    <div class="skills-list">
                        ${career.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                <div class="career-growth">
                    <strong>Growth Trend:</strong> <span>${career.growth_trend}</span>
                </div>
            `;

            careerCard.onclick = () => this.showCareerDetails(career);
            matchesContainer.appendChild(careerCard);
        });
    }

    // New: Render skills chart from Gemini job data
    renderSkillsChartFromGemini() {
        const canvas = document.getElementById('skillsChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Aggregate skills from Gemini job cards
        const allSkills = [];
        this.careerRecommendations.forEach(job => {
            if (Array.isArray(job.skills)) {
                allSkills.push(...job.skills);
            }
        });
        // Count occurrences of each skill
        const skillCounts = {};
        allSkills.forEach(skill => {
            skillCounts[skill] = (skillCounts[skill] || 0) + 1;
        });
        // Pick top skills and group by type if possible
        // For demo, just show top 3 most common skills as radar chart axes
        const sortedSkills = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]);
        const topSkills = sortedSkills.slice(0, 3).map(([skill]) => skill);
        const topSkillCounts = sortedSkills.slice(0, 3).map(([, count]) => count * 20); // scale for chart

        if (this.skillsChart) {
            this.skillsChart.destroy();
        }

        this.skillsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: topSkills.length ? topSkills : ['Skill 1', 'Skill 2', 'Skill 3'],
                datasets: [{
                    label: 'Top Gemini Job Skills',
                    data: topSkillCounts.length ? topSkillCounts : [0, 0, 0],
                    backgroundColor: 'rgba(31, 184, 205, 0.2)',
                    borderColor: '#1FB8CD',
                    borderWidth: 2,
                    pointBackgroundColor: '#1FB8CD'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // New: Render industry trends chart from Gemini job data
    renderTrendsChartFromGemini() {
        const canvas = document.getElementById('trendsChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Aggregate industries and growth trends from Gemini job cards
        const industries = [];
        const growthTrends = [];
        this.careerRecommendations.forEach(job => {
            if (job.industry) industries.push(job.industry);
            if (job.growth_trend) growthTrends.push(job.growth_trend);
        });

        // For demo, just count industry occurrences
        const industryCounts = {};
        industries.forEach(ind => {
            industryCounts[ind] = (industryCounts[ind] || 0) + 1;
        });
        const industryLabels = Object.keys(industryCounts);
        const industryData = Object.values(industryCounts).map(count => count * 10); // scale for chart

        if (this.trendsChart) {
            this.trendsChart.destroy();
        }

        this.trendsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: industryLabels.length ? industryLabels : ['Industry 1', 'Industry 2'],
                datasets: [{
                    label: 'Industry Demand (Gemini)',
                    data: industryData.length ? industryData : [0, 0],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45
                        }
                    }
                }
            }
        });
    }

    showCareerDetails(career) {
        const modal = document.getElementById('careerModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');

        if (!modal || !title || !body) return;

        title.textContent = career.title;
        
        // Generate skills gap analysis
        const skillsGap = this.generateSkillsGap(career);
        const learningPath = this.generateLearningPath(career);

        body.innerHTML = `
            <div class="career-overview">
                <p><strong>Industry:</strong> ${career.industry}</p>
                <p><strong>Description:</strong> ${career.description}</p>
                <p><strong>Average Salary:</strong> ${career.avg_salary_inr} <span style='font-size:12px;'>(INR)</span></p>
                <p><strong>Match Score:</strong> ${career.overallMatch}% (Skills: ${career.skillsMatch}%, Personality: ${career.personalityMatch}%)</p>
            </div>
            
            <div class="gap-analysis">
                <h4>Skills Gap Analysis</h4>
                ${skillsGap}
            </div>
            
            <div class="learning-path">
                <h4>Recommended Learning Path</h4>
                ${learningPath}
            </div>
        `;

        modal.classList.remove('hidden');
    }

    generateSkillsGap(career) {
        return career.skills.map(skill => {
            const userLevel = this.userSkills[skill] || 0;
            const requiredLevel = 3; // Assume 3/4 is required
            const gaps = Array(4).fill(0).map((_, i) => {
                if (i < userLevel) return 'filled';
                if (i < requiredLevel) return 'missing';
                return 'empty';
            });

            return `
                <div class="skill-gap">
                    <span class="skill-gap-name">${skill}</span>
                    <div class="gap-indicator">
                        ${gaps.map(status => `<div class="gap-bar ${status}"></div>`).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    generateLearningPath(career) {
        const steps = [
            'Master fundamental concepts',
            'Gain practical experience',
            'Build a portfolio',
            'Obtain relevant certifications',
            'Network with professionals'
        ];

        return steps.map((step, i) => `
            <div class="learning-step">
                <div class="step-number">${i + 1}</div>
                <div class="step-content">
                    <h4>${step}</h4>
                    <div class="step-meta">
                        <span>Duration: ${2 + i} months</span>
                        <span>Difficulty: ${['Beginner', 'Intermediate', 'Intermediate', 'Advanced', 'Intermediate'][i]}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    closeModal() {
        const modal = document.getElementById('careerModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    resetAssessment() {
        console.log('Resetting assessment');
        this.currentStep = 0;
        this.userSkills = {};
        this.userPersonality = {};
        this.careerRecommendations = [];
        
        if (this.skillsChart) {
            this.skillsChart.destroy();
            this.skillsChart = null;
        }
        if (this.trendsChart) {
            this.trendsChart.destroy();
            this.trendsChart = null;
        }
        
        this.showLandingPage();
    }

    // Download results as PDF
    async downloadResultsPDF() {
        // Professional PDF layout
        const date = new Date().toLocaleString();
        const doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        let y = 40;

        // Header bar
        doc.setFillColor(0, 123, 255); // Bootstrap blue
        doc.rect(0, 0, pageWidth, 60, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(26);
        doc.text('AI Career Advisor', pageWidth / 2, 38, { align: 'center' });
        doc.setFontSize(12);
        doc.text(`Date: ${date}`, pageWidth / 2, 54, { align: 'center' });

        // Reset for body
        y = 80;
        doc.setTextColor(33, 37, 41); // Bootstrap body text

        // User Skills Section
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('User Skills', 40, y);
        y += 10;
        doc.setDrawColor(0, 123, 255);
        doc.setLineWidth(1);
        doc.line(40, y, pageWidth - 40, y);
        y += 12;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        for (const [skill, level] of Object.entries(this.userSkills)) {
            doc.text(`• ${skill}: ${level}/4`, 50, y);
            y += 14;
            if (y > 750) { y = this._addPdfPageFooter(doc, 1, 2); }
        }

        y += 10;
        // Personality Profile Section
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Personality Profile', 40, y);
        y += 10;
        doc.setDrawColor(0, 123, 255);
        doc.setLineWidth(1);
        doc.line(40, y, pageWidth - 40, y);
        y += 12;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        for (const [trait, arr] of Object.entries(this.userPersonality)) {
            const avg = arr && arr.length ? (arr.reduce((a, b) => a + (b || 0), 0) / arr.length).toFixed(2) : 'N/A';
            doc.text(`• ${trait}: ${avg}/5`, 50, y);
            y += 14;
            if (y > 750) { y = this._addPdfPageFooter(doc, 1, 2); }
        }

        y += 10;
        // Top Career Recommendations Section
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Top Career Recommendations', 40, y);
        y += 10;
        doc.setDrawColor(0, 123, 255);
        doc.setLineWidth(1);
        doc.line(40, y, pageWidth - 40, y);
        y += 12;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        let recs = this.careerRecommendations.slice(0, 5);
        recs.forEach((career, i) => {
            doc.setFont('helvetica', 'bold');
            doc.text(`${i + 1}. ${career.title}`, 50, y);
            y += 16;
            doc.setFont('helvetica', 'normal');
            doc.textWithLink('Industry:', 60, y, { url: '' });
            doc.setFont('helvetica', 'bold');
            doc.text(`${career.industry}`, 120, y);
            y += 14;
            doc.setFont('helvetica', 'normal');
            doc.textWithLink('Salary:', 60, y, { url: '' });
            doc.setFont('helvetica', 'bold');
            // Format salary with rupee symbol and commas
            let salary = career.avg_salary_inr ? `₹${career.avg_salary_inr.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",")}` : 'N/A';
            doc.text(salary, 120, y);
            y += 14;
            doc.setFont('helvetica', 'normal');
            doc.textWithLink('Skills:', 60, y, { url: '' });
            doc.setFont('helvetica', 'bold');
            doc.text((career.skills || []).join(', '), 120, y);
            y += 14;
            doc.setFont('helvetica', 'normal');
            doc.textWithLink('Growth:', 60, y, { url: '' });
            doc.setFont('helvetica', 'bold');
            doc.text(career.growth_trend || '', 120, y, { maxWidth: pageWidth - 140 });
            y += 20;
            // Divider between careers
            doc.setDrawColor(222, 226, 230);
            doc.setLineWidth(0.5);
            doc.line(50, y, pageWidth - 50, y);
            y += 10;
            if (y > 750) { y = this._addPdfPageFooter(doc, 1, 2); }
        });

        // Footer
        this._addPdfPageFooter(doc, 1, 1);

        doc.save('career-assessment-results.pdf');
    }

    // Helper to add footer and new page if needed (professional layout)
    _addPdfPageFooter(doc, pageNum, totalPages) {
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth();
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('AI Career Advisor', 40, pageHeight - 20);
        doc.text(`Page ${pageNum}`, pageWidth - 40, pageHeight - 20, { align: 'right' });
        doc.setTextColor(33, 37, 41);
        doc.addPage();
        return 80;
    }
}

// Global variable to ensure single instance
let careerAdvisor = null;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Career Advisor');
    if (!careerAdvisor) {
        careerAdvisor = new CareerAdvisor();
    }
});

// Fallback initialization
window.addEventListener('load', () => {
    console.log('Window loaded');
    if (!careerAdvisor) {
        careerAdvisor = new CareerAdvisor();
    }
});