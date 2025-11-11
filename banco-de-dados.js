// ---------------------------------------------------------------------
// BANCO DE DADOS LOCAL DE TEXTOS E QUESTÕES
// ---------------------------------------------------------------------
// Para adicionar mais simulados, basta copiar um dos objetos "TEXTO"
// e colar no final da lista, dentro do array LOCAL_TEXT_DATABASE.
// ---------------------------------------------------------------------

const LOCAL_TEXT_DATABASE = [
    // TEXTO 1: Misinformation
    {
        "title": "Misinformation in the Digital Age",
        "text_content": `The proliferation of misinformation in the digital age presents a complex and multifaceted challenge to democratic societies. Often disguised as legitimate news, "fake news" is intentionally crafted to deceive audiences, manipulate public opinion, and sow societal discord. This phenomenon is amplified by social media algorithms, which are frequently optimized for engagement and virality rather than accuracy. As misleading narratives spread faster than factual corrections, they can erode public trust in institutions, polarize communities, and even influence electoral outcomes.

A primary difficulty in combating misinformation is its psychological appeal. False narratives often tap into pre-existing biases and emotional responses, making them highly resonant with their target audiences. Furthermore, the sheer volume of information available online makes it difficult for the average user to **vet** every claim. While fact-checking organizations play a crucial role, their efforts are often outpaced by the speed at which misinformation is generated and disseminated. Addressing this issue requires a systemic approach, involving enhanced media literacy education, responsible platform governance, and a renewed commitment from citizens to critically evaluate the information they consume and share.`,
        "questions": [
            {
                "question": "What is the main subject of the text?",
                "options": [
                    "The technical aspects of social media algorithms.",
                    "The role of fact-checking organizations in modern journalism.",
                    "The challenges and societal impact of digital misinformation.",
                    "The history of electoral manipulation through media.",
                    "The psychological biases of social media users."
                ],
                "correct_option": "C"
            },
            {
                "question": "According to the text, why does misinformation spread so effectively?",
                "options": [
                    "Because fact-checking organizations are not well-funded.",
                    "Because it appeals to people's existing emotions and biases.",
                    "Because legitimate news is no longer considered trustworthy.",
                    "Because social media platforms actively create fake news.",
                    "Because most people do not have access to the internet."
                ],
                "correct_option": "B"
            },
            {
                "question": "In the sentence, \"it difficult for the average user to **vet** every claim,\" how could we best understand \"vet\"?",
                "options": [
                    "To share or repost.",
                    "To ignore or dismiss.",
                    "To create or invent.",
                    "To examine or check for accuracy.",
                    "To emotionally react to."
                ],
                "correct_option": "D"
            },
            {
                "question": "The text suggests that a complete solution to misinformation requires:",
                "options": [
                    "Shutting down all social media platforms.",
                    "Relying solely on government regulation.",
                    "A combination of education, platform responsibility, and citizen effort.",
                    "Replacing algorithms with human editors.",
                    "Training users to have fewer emotional responses."
                ],
                "correct_option": "C"
            },
            {
                "question": "Which of the following statements is NOT supported by the text?",
                "options": [
                    "Misinformation is designed to look like real news.",
                    "Social media algorithms can contribute to the problem.",
                    "Factual corrections often spread slower than fake news.",
                    "The primary goal of misinformation is to educate the public.",
                    "Misinformation can weaken public trust in institutions."
                ],
                "correct_option": "D"
            }
        ]
    },

    // TEXTO 2: Climate Change & Food Security
    {
        "title": "Climate Change and Food Security",
        "text_content": `Global food security is inextricably linked to the escalating crisis of climate change. Shifting weather patterns, rising global temperatures, and the increasing frequency of extreme weather events—such as droughts, floods, and heatwaves—pose a direct threat to agricultural productivity worldwide. These changes disrupt traditional farming cycles, reduce crop yields, and impact the availability of freshwater resources essential for cultivation. The consequences are particularly **dire** for vulnerable populations in developing nations, who rely heavily on agriculture for their livelihood and subsistence.

Moreover, the impact of climate change extends beyond mere production. It affects the entire food supply chain, from processing and storage to transportation and distribution. For instance, higher temperatures can lead to increased spoilage, while extreme weather can destroy critical infrastructure like roads and warehouses. Addressing food security in the context of climate change demands **resilient** agricultural practices. This includes the development of drought-resistant crops, the implementation of smarter water management techniques, and the promotion of sustainable farming methods that both adapt to and help mitigate climate change.`,
        "questions": [
            {
                "question": "What is the main argument of the text?",
                "options": [
                    "Developing nations are the sole cause of climate change.",
                    "Climate change is a significant threat to global food security, affecting both production and distribution.",
                    "New technologies will easily solve all problems related to food production.",
                    "The only way to ensure food security is by developing drought-resistant crops.",
                    "Food supply chains are inefficient but are not affected by weather."
                ],
                "correct_option": "B"
            },
            {
                "question": "In the sentence, \"The consequences are particularly **dire** for vulnerable populations,\" how could we best understand \"dire\"?",
                "options": [
                    "Unimportant or minor.",
                    "Beneficial or helpful.",
                    "Extremely serious or terrible.",
                    "Temporary or short-term.",
                    "Surprising or unexpected."
                ],
                "correct_option": "C"
            },
            {
                "question": "According to the text, the impact of climate change on the food supply chain includes:",
                "options": [
                    "Only a reduction in crop yields.",
                    "Only the disruption of farming cycles.",
                    "Only the development of new farming methods.",
                    "Problems with storage, transportation, and spoilage.",
                    "An increase in the availability of freshwater."
                ],
                "correct_option": "D"
            },
            {
                "question": "In the sentence, \"Addressing food security... demands **resilient** agricultural practices,\" how could we best understand \"resilient\"?",
                "options": [
                    "Capable of resisting and recovering from difficult conditions.",
                    "Traditional and unchanged for many years.",
                    "Inexpensive and easy to implement quickly.",
                    "Focused only on producing a single type of crop.",
                    "Highly profitable for large corporations."
                ],
                "correct_option": "A"
            },
            {
                "question": "What does the text suggest as a necessary response to the problem?",
                "options": [
                    "Moving all farming operations indoors.",
                    "Increasing the use of traditional, older farming methods.",
                    "Focusing only on international food aid and distribution.",
                    "Implementing sustainable and adaptive agricultural techniques.",
                    "Ignoring climate change to focus on economic development."
                ],
                "correct_option": "D"
            }
        ]
    },

    // TEXTO 3: Gig Economy
    {
        "title": "The Gig Economy",
        "text_content": `The rise of the "gig economy"—a labor market characterized by the prevalence of short-term contracts and freelance work as opposed to permanent jobs—is fundamentally reshaping the future of work. Platforms like Uber, Deliveroo, and Upwork connect millions of independent workers with on-demand tasks. Proponents of this model argue that it offers unprecedented flexibility, allowing workers to set their own hours and choose their projects. For businesses, it provides agility, enabling them to scale their workforce up or down based on immediate demand without the overheads associated with permanent staff.

However, this model is also the subject of intense criticism. Labor advocates argue that the gig economy **erodes** traditional worker protections, such as minimum wage, paid sick leave, and retirement benefits. Many gig workers find themselves in a precarious position, facing income instability and a lack of a clear career path. The classification of these workers as "independent contractors" is a central point of contention, as it legally absolves companies of many responsibilities. As this sector continues to grow, policymakers face the difficult task of balancing the benefits of flexibility with the need to ensure fair labor standards and economic security for all workers.`,
        "questions": [
            {
                "question": "What is the text's primary purpose?",
                "options": [
                    "To promote a specific gig economy platform.",
                    "To argue that all workers should become freelancers.",
                    "To discuss the advantages and disadvantages of the gig economy.",
                    "To provide a history of labor laws in the 20th century.",
                    "To criticize workers who choose flexible hours."
                ],
                "correct_option": "C"
            },
            {
                "question": "According to proponents, what is a major benefit of the gig economy?",
                "options": [
                    "High-income stability for all workers.",
                    "Generous retirement and healthcare benefits.",
                    "Flexibility for workers and agility for companies.",
                    "A clear and structured career path.",
                    "The elimination of all 'overhead' costs."
                ],
                "correct_option": "C"
            },
            {
                "question": "In the sentence, \"the gig economy **erodes** traditional worker protections,\" how could we best understand \"erodes\"?",
                "options": [
                    "Gradually strengthens or builds up.",
                    "Quickly introduces or creates.",
                    "Gradually wears away or destroys.",
                    "Officially celebrates or promotes.",
                    "To investigate or question."
                ],
                "correct_option": "C"
            },
            {
                "question": "What is described as a \"central point of contention\" in the gig economy?",
                "options": [
                    "The high fees charged by gig platforms.",
                    "The classification of workers as independent contractors.",
                    "The lack of flexibility offered to workers.",
                    "The difficulty for companies in finding workers.",
                    "The slow speed of the technology platforms."
                ],
                "correct_option": "B"
            },
            {
                "question": "The text suggests that the future challenge for policymakers is to:",
                "options": [
                    "Eliminate the gig economy entirely.",
                    "Force all gig workers into permanent jobs.",
                    "Find a balance between flexibility and worker protection.",
                    "Prevent companies from using independent contractors.",
                    "Reduce the flexibility offered to businesses."
                ],
                "correct_option": "C"
            }
        ]
    },

    // TEXTO 4: Social Media & Mental Health
    {
        "title": "Social Media and Mental Health",
        "text_content": `The pervasive nature of social media has fundamentally altered how individuals, particularly adolescents, perceive themselves and interact with the world. While these platforms can foster connection and provide access to supportive communities, they are increasingly linked to a rise in mental health concerns, including anxiety, depression, and poor body image. This paradox stems from the curated nature of online life. Users are inundated with "highlight reels" of their peers—images and posts that depict only success, happiness, and physical perfection. This creates an **unattainable** standard of living, leading to social comparison and feelings of inadequacy.

Furthermore, the algorithmic design of these platforms prioritizes engagement, often at the cost of well-being. Features like infinite scrolling and intermittent variable rewards (such as "likes" and notifications) are engineered to be addictive, promoting **compulsive** use. This can interfere with essential real-world activities, including sleep, in-person social interaction, and academic focus. As society grapples with these consequences, there is a growing call for digital literacy programs that teach young users to navigate this environment critically and for platforms to redesign their systems to prioritize user health over mere engagement.`,
        "questions": [
            {
                "question": "What is the main topic of the text?",
                "options": [
                    "The technical design of social media algorithms.",
                    "The positive-only aspects of online communities.",
                    "The link between social media use and mental health concerns.",
                    "The decline of academic focus in adolescents.",
                    "The rise of 'highlight reels' as a form of art."
                ],
                "correct_option": "C"
            },
            {
                "question": "According to the text, why do \"highlight reels\" cause mental health issues?",
                "options": [
                    "They are expensive to produce.",
                    "They provide a realistic view of life.",
                    "They are not seen by enough people.",
                    "They create a false standard of perfection, leading to social comparison.",
                    "They are a source of connection and support."
                ],
                "correct_option": "D"
            },
            {
                "question": "In the sentence, \"This creates an **unattainable** standard of living,\" how could we best understand \"unattainable\"?",
                "options": [
                    "Not perfect.",
                    "Not popular.",
                    "Not possible to achieve.",
                    "Not widely known.",
                    "Not desirable."
                ],
                "correct_option": "C"
            },
            {
                "question": "In the sentence, \"promoting **compulsive** use,\" how could we best understand \"compulsive\"?",
                "options": [
                    "Done in a relaxed and casual way.",
                    "Related to a strong, irresistible urge.",
                    "Beneficial for one's health.",
                    "Performed only by adolescents.",
                    "Done for academic purposes."
                ],
                "correct_option": "B"
            },
            {
                "question": "What two solutions does the text suggest at the end?",
                "options": [
                    "Banning social media and increasing in-person interaction.",
                    "Better digital literacy education and platforms redesigning for user health.",
                    "More 'likes' and notifications to increase user happiness.",
                    "Government control of all social media content.",
                    "Infinite scrolling and more engaging algorithms."
                ],
                "correct_option": "B"
            }
        ]
    },

    // TEXTO 5: AI in Art
    {
        "title": "AI and Artistic Creation",
        "text_content": `The advent of sophisticated generative AI models, such as DALL-E 2 and Midjourney, is **blurring** the lines between human artist and machine. These tools can produce complex, aesthetically pleasing images from simple text descriptions, or "prompts." This capability has sparked a vigorous debate within the art world. On one hand, some artists have embraced these tools as powerful assistants, allowing for rapid prototyping of ideas and the creation of visuals that would otherwise be impossible to produce. It's seen as a new medium, an evolution of digital tools like Photoshop.

On the other hand, there are significant concerns about copyright, originality, and the potential displacement of human artists. Since these models are trained on vast datasets of existing human-made images, the "originality" of their output is questionable, with some critics labeling it high-tech plagiarism. Furthermore, the role of the "artist" is being redefined. Is the artist the one who writes the **prompt**, or is the AI itself a creative collaborator? This technological shift challenges our core definitions of creativity and authorship, forcing a re-evaluation of what it means to create art in the 21st century.`,
        "questions": [
            {
                "question": "What is the primary theme of the text?",
                "options": [
                    "A technical guide on how to use generative AI models.",
                    "An argument that AI will completely replace human artists.",
                    "A discussion on the debate surrounding AI's role in art, originality, and creativity.",
                    "A legal analysis of copyright law in the digital age.",
                    "A history of digital art tools like Photoshop."
                ],
                "correct_option": "C"
            },
            {
                "question": "In the sentence, \"is **blurring** the lines between human artist and machine,\" what does \"blurring\" mean?",
                "options": [
                    "Making the distinction clearer and more defined.",
                    "Completely erasing the role of the human artist.",
                    "Making the difference between the two less clear or distinct.",
                    "Damaging the quality of the art produced.",
                    "Introducing a new, unrelated concept."
                ],
                "correct_option": "C"
            },
            {
                "question": "According to the text, what is a \"prompt\" in the context of generative AI?",
                "options": [
                    "The final image produced by the AI.",
                    "A legal challenge against an AI model.",
                    "A text description given to the AI to generate an image.",
                    "A dataset of human-made images.",
                    "A type of digital painting software."
                ],
                "correct_option": "C"
            },
            {
                "question": "What is one of the main concerns critics have about AI art?",
                "options": [
                    "The AI models are not fast enough for professional use.",
                    "The tools are too difficult for the average person to use.",
                    "The AI generates images that are not aesthetically pleasing.",
                    "The models are trained on existing art, raising questions of plagiarism.",
                    "The AI costs too much to operate."
                ],
                "correct_option": "D"
            },
            {
                "question": "Which of the following statements is NOT supported by the text?",
                "options": [
                    "Some artists see AI as a helpful new tool.",
                    "The definition of 'artist' is being questioned.",
                    "Generative AI can create images from text.",
                    "The text concludes that AI is not a creative collaborator.",
                    "AI art raises concerns about originality."
                ],
                "correct_option": "D"
            }
        ]
    },

    // TEXTO 6: Remote Work
    {
        "title": "The Future of Remote Work",
        "text_content": `The COVID-19 pandemic acted as a massive, unplanned experiment in remote work, forcing companies worldwide to adopt distributed workforce models almost overnight. As the world moves into a post-pandemic era, the debate is no longer *if* remote work is viable, but rather to what extent it should be maintained. Proponents point to increased productivity (due to fewer interruptions and no commute), higher employee satisfaction, and access to a global talent pool. For many workers, the autonomy and flexibility offered by working from home are now non-negotiable.

However, the shift is not without its challenges. Critics highlight the erosion of company culture, the difficulties in spontaneous collaboration (the "water cooler effect"), and the risk of employee burnout and isolation. The **ubiquitous** nature of video conferencing has led to "Zoom fatigue," and managers struggle to mentor junior staff effectively from a distance. The most likely outcome appears to be a **trade-off**: a hybrid model, where employees split their time between the office and home. This approach aims to capture the best of both worlds, but it requires a deliberate redesign of communication protocols and performance metrics.`,
        "questions": [
            {
                "question": "What is the text's main subject?",
                "options": [
                    "The specific software used for video conferencing.",
                    "The history of the COVID-19 pandemic's economic impact.",
                    "The ongoing debate about the benefits and drawbacks of remote work.",
                    "A guide for managers on how to mentor junior staff.",
                    "An argument that all companies should return to the office."
                ],
                "correct_option": "C"
            },
            {
                "question": "In the sentence, \"The **ubiquitous** nature of video conferencing...\" how could we best understand \"ubiquitous\"?",
                "options": [
                    "Rare and uncommon.",
                    "New and untested.",
                    "Expensive and exclusive.",
                    "Present or found everywhere.",
                    "Ineffective and slow."
                ],
                "correct_option": "D"
            },
            {
                "question": "What does the text describe as a \"trade-off\"?",
                "options": [
                    "The hybrid model that balances in-office and remote work.",
                    "The choice between high productivity and high satisfaction.",
                    "The cost of internet access for remote workers.",
                    "The global talent pool versus local employees.",
                    "The "
                ],
                "correct_option": "A"
            },
            {
                "question": "Which of the following is listed as a challenge of remote work?",
                "options": [
                    "Employees having too much autonomy.",
                    "The difficulty in spontaneous collaboration and mentorship.",
                    "The cost of setting up a home office.",
                    "The reduction in productivity due to commute times.",
                    "The lack of access to a global talent pool."
                ],
                "correct_option": "B"
            },
            {
                "question": "According to the text, which statement is true?",
                "options": [
                    "Most companies are returning to a 100% in-office model.",
                    "Remote work was proven to be entirely non-viable.",
                    "Employees universally dislike the flexibility of remote work.",
                    "\"Zoom fatigue\" is a positive outcome of video conferencing.",
                    "A hybrid model is presented as a likely future compromise."
                ],
                "correct_option": "E"
            }
        ]
    },

    // TEXTO 7: Urban Sustainability
    {
        "title": "Urban Sustainability and Green Cities",
        "text_content": `As more than half of the world's population now resides in urban areas, the concept of urban sustainability has become paramount. A sustainable city is designed with consideration for its environmental impact, inhabited by people dedicated to minimizing inputs of energy, water, and food, and waste output. The goal is to create a "green city" that is not only environmentally friendly but also socially equitable and economically viable. This **holistic** approach involves more than just planting trees or installing solar panels; it requires a fundamental rethink of urban infrastructure.

Key strategies include the development of robust public transportation systems to reduce reliance on private automobiles, which are a major source of greenhouse gas emissions. Additionally, efficient waste management, such as recycling and composting programs, is crucial for reducing landfill. Another vital aspect is the integration of "green spaces" and "blue spaces" (parks and waterways), which help manage stormwater, reduce the urban heat island effect, and improve the mental and physical well-being of residents. To **retrofit** existing cities for sustainability is a massive challenge, but it is essential for the future of the planet.`,
        "questions": [
            {
                "question": "What is the main topic of the text?",
                "options": [
                    "The problem of the urban heat island effect.",
                    "The importance and key strategies of urban sustainability.",
                    "A comparison of different public transportation systems.",
                    "The economic benefits of recycling programs.",
                    "The history of the world's population moving to cities."
                ],
                "correct_option": "B"
            },
            {
                "question": "In the sentence, \"This **holistic** approach involves...\" how could we best understand \"holistic\"?",
                "options": [
                    "Focused on a single, narrow solution.",
                    "Considering the whole system rather than just parts.",
                    "Temporary or short-term.",
                    "Driven by technology and automation.",
                    "New and unproven."
                ],
                "correct_option": "B"
            },
            {
                "question": "In the sentence, \"To **retrofit** existing cities... is a massive challenge,\" what does \"retrofit\" mean?",
                "options": [
                    "To build new cities from scratch.",
                    "To add new components or features to something that already exists.",
                    "To tear down and completely replace old buildings.",
                    "To create a computer simulation of a city.",
                    "To abandon old cities and move to rural areas."
                ],
                "correct_option": "B"
            },
            {
                "question": "Which of the following is NOT mentioned as a strategy for a green city?",
                "options": [
                    "Developing strong public transportation.",
                    "Integrating parks and waterways.",
                    "Implementing efficient waste management.",
                    "Reducing reliance on private cars.",
                    "Mandating that all citizens become vegetarian."
                ],
                "correct_option": "E"
            },
            {
                "question": "The text states that green spaces and blue spaces help to:",
                "options": [
                    "Increase the number of private automobiles.",
                    "Generate more energy for the city.",
                    "Manage stormwater and reduce the urban heat island effect.",
                    "Increase the city's food production.",
                    "Replace the need for recycling programs."
                ],
                "correct_option": "C"
            }
        ]
    },

    // TEXTO 8: The Attention Economy
    {
        "title": "The Attention Economy",
        "text_content": `We live in what is often called the "attention economy." In an information-rich world, the one resource that is truly scarce is human attention. Companies, particularly in the tech and media sectors, are in a relentless battle to capture and hold this **finite** resource. Platforms like Facebook, TikTok, and YouTube are not free; they are paid for by the attention of their users, which is then sold to advertisers. The business model is simple: the more time you spend on the platform, the more ads you see, and the more revenue the company generates.

This model has profound consequences. To maximize engagement, algorithms are designed to promote content that is emotionally charged, divisive, or sensational, rather than content that is necessarily accurate or beneficial. Furthermore, features like push notifications and infinite scroll are engineered to create behavioral addiction. The "cost" of this system is not just our time; it's the erosion of our ability to focus deeply, the increase in societal polarization, and the **commoditization** of our cognitive resources. Navigating this economy requires a conscious effort to reclaim control over one's own focus and mental space.`,
        "questions": [
            {
                "question": "What is the central argument of the text?",
                "options": [
                    "Social media platforms are beneficial for connecting people.",
                    "Human attention is a scarce resource that companies compete to capture for profit.",
                    "Advertisers are the main victims of the attention economy.",
                    "The most important content is always the most sensational.",
                    "The business model of tech companies is based on user subscriptions."
                ],
                "correct_option": "B"
            },
            {
                "question": "In the sentence, \"...this **finite** resource,\" how could we best understand \"finite\"?",
                "options": [
                    "Unlimited or endless.",
                    "New and recently discovered.",
                    "Not valuable or worthless.",
                    "Having a limit or end.",
                    "Related to finance."
                ],
                "correct_option": "D"
            },
            {
                "question": "In the sentence, \"the **commoditization** of our cognitive resources,\" what does \"commoditization\" mean?",
                "options": [
                    "The process of making something more complex and unique.",
                    "The act of protecting and saving a resource.",
                    "The process of treating something (like attention) as a raw material or product that can be bought and sold.",
                    "The improvement and enhancement of our ability to focus.",
                    "The study of how our brains work."
                ],
                "correct_option": "C"
            },
            {
                "question": "According to the text, why do algorithms promote sensational content?",
                "options": [
                    "Because it is the most accurate and beneficial information.",
                    "To educate the public on important world events.",
                    "To challenge users' pre-existing biases.",
                    "To maximize user engagement and, consequently, ad revenue.",
                    "To create a calm and focused mental space for users."
                ],
                "correct_option": "D"
            },
            {
                "question": "Which of the following is mentioned as a 'cost' of the attention economy?",
                "options": [
                    "The high price of smartphones.",
                    "The decrease in company profits.",
                    "The erosion of our ability to focus deeply.",
                    "The failure of advertisers to reach audiences.",
                    "The lack of information in the world."
                ],
                "correct_option": "C"
            }
        ]
    }
];
