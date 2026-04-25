"use client";
import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    nav: { getStarted: "Get Started", journey: "My Journey", locator: "Booth Locator", assistant: "AI Assistant" },
    hero: { badge: "Election 2026 Ready", title1: "Your Step-by-Step Guide to ", titleHighlight: "Voting", subtitle: "From registration to casting your vote, we guide you at every step. Simple, personalized, and clear.", btnStart: "Get Started", btnLearn: "Learn the Process" },
    features: { header: "Everything you need to be election-ready", sub: "We simplify the process so you can focus on making your voice heard.", f1: "Personalized Journey", f1Sub: "Roadmap tailored to your age and location.", f2: "AI Assistant", f2Sub: "Chat for instant, beginner-friendly answers.", f3: "Booth Locator", f3Sub: "Find your nearest polling booth easily." },
    how: { header: "How it works", s1Title: "Tell us about yourself", s1Sub: "Answer 3 simple questions about your age, location, and voter ID status.", s2Title: "Get your roadmap", s2Sub: "Follow a customized checklist to ensure you're registered and ready.", s3Title: "Cast your vote", s3Sub: "Find your booth, carry the right documents, and vote with confidence." },
    cta: { title: "Ready to make a difference?", sub: "Join thousands of informed voters.", btn: "Start Your Journey Now" },
    onboarding: { step: "Step", of: "of", ageTitle: "How old are you?", ageSub: "You must be 18 or older to vote.", ageOption1: "Under 18", ageOption2: "18 - 21", ageOption3: "Over 21", liveTitle: "Where do you live?", liveSub: "Voting rules vary by state.", stateLabel: "Select your State/UT", stateChoose: "-- Choose State --", idTitle: "Do you have a Voter ID card?", idSub: "Also known as EPIC (Electors Photo Identity Card)", idYes: "Yes, I have one", idNo: "No, I need to register", idUnsure: "I'm not sure", back: "Back", continue: "Continue", finish: "Get My Roadmap" },
    dashboard: { title: "Your Voting Roadmap", personalized: "Personalized for:", days: "Days until Election", guide: "Step-by-Step Guide", deadline: "Important Deadline", regClose: "Voter registration for", quick: "Quick Actions", portal: "Go to portal", action: "Take action" },
    roadmap: { underageTitle: "Wait until you're 18", underageDesc: "You must be 18 to vote. Learn about the process in the meantime.", regTitle: "Register for Voter ID (Form 6)", verifyTitle: "Verify Electoral Roll Name", verifyDesc: "Ensure your name is correctly listed in your constituency.", boothTitle: "Find Polling Booth", boothDesc: "Locate where you need to go on election day.", docsTitle: "Prepare Documents", docsDesc: "Voter ID slip + Government ID (Aadhaar, PAN, etc.)", voteTitle: "Cast Your Vote", day: "Election Day", deadline: "Deadline" },
    learn: { header: "Knowledge Center", sub: "Everything you need to know about the democratic process.", tab1: "Step Guide", tab2: "Readiness Quiz", g1Title: "1. Registration Basics", g1Sub: "To register, you need to fill Form 6. You can do this online at the NVSP portal or offline.", g1L1: "Be 18 years old", g1L2: "Have address proof", g1L3: "Have a passport photo", g2Title: "2. Required Documents", g2Sub: "On election day, you MUST carry your Voter Slip AND a photo ID. Valid IDs include:", g2L1: "Voter ID Card (EPIC)", g2L2: "Aadhaar Card or PAN", g2L3: "Driving License or Passport", g3Title: "3. The Voting Process", g3Sub: "Inside the booth, here is what happens:", g3L1: "Official checks your ID", g3L2: "Finger is marked with ink", g3L3: "Press button on EVM next to your candidate" },
    quiz: { introTitle: "Are you ready to vote?", introSub: "Take this quick 3-question quiz to test your election knowledge.", startBtn: "Start Quiz", resultTitle: "Quiz Completed!", perfect: "Perfect! You are fully prepared for the elections.", keepLearning: "Good job! Review the 'Step Guide' to brush up on a few details.", retake: "Retake Quiz", q1: "What is the minimum age to vote in India?", q1O1: "16 years", q1O2: "18 years", q1O3: "21 years", q2: "Which of these is a valid ID for voting if you don't have a Voter ID?", q2O1: "Aadhaar Card", q2O2: "Gym Membership Card", q2O3: "Electricity Bill", q3: "Can you vote online from your home?", q3O1: "Yes, through an app", q3O2: "No, you must visit a booth", q3O3: "Yes, if registered" }
  },
  hi: {
    nav: { getStarted: "शुरू करें", journey: "मेरी यात्रा", locator: "बूथ लोकेटर", assistant: "एआई सहायक" },
    hero: { badge: "चुनाव 2026 तैयार", title1: "मतदान के लिए आपका चरण-दर-चरण ", titleHighlight: "मार्गदर्शक", subtitle: "पंजीकरण से लेकर वोट डालने तक, हम हर कदम पर मार्गदर्शन करते हैं। सरल, व्यक्तिगत और स्पष्ट।", btnStart: "शुरू करें", btnLearn: "प्रक्रिया जानें" },
    features: { header: "चुनाव के लिए आवश्यक सब कुछ", sub: "हम प्रक्रिया को सरल बनाते हैं ताकि आप अपनी आवाज उठाने पर ध्यान केंद्रित कर सकें।", f1: "व्यक्तिगत यात्रा", f1Sub: "आपकी आयु और स्थान के अनुसार रोडमैप।", f2: "एआई सहायक", f2Sub: "तुरंत उत्तरों के लिए चैट करें।", f3: "बूथ लोकेटर", f3Sub: "अपना निकटतम मतदान केंद्र खोजें।" },
    how: { header: "यह कैसे काम करता है", s1Title: "हमें अपने बारे में बताएं", s1Sub: "अपनी उम्र, स्थान और वोटर आईडी स्थिति के बारे में 3 सरल प्रश्नों के उत्तर दें।", s2Title: "अपना रोडमैप प्राप्त करें", s2Sub: "सुनिश्चित करें कि आप पंजीकृत और तैयार हैं।", s3Title: "अपना वोट डालें", s3Sub: "अपना बूथ खोजें और आत्मविश्वास के साथ वोट करें।" },
    cta: { title: "बदलाव लाने के लिए तैयार हैं?", sub: "हजारों जागरूक मतदाताओं में शामिल हों।", btn: "अपनी यात्रा अभी शुरू करें" },
    onboarding: { step: "चरण", of: "का", ageTitle: "आपकी उम्र क्या है?", ageSub: "वोट देने के लिए आपकी उम्र 18+ होनी चाहिए।", ageOption1: "18 से कम", ageOption2: "18 - 21", ageOption3: "21 से ऊपर", liveTitle: "आप कहाँ रहते हैं?", liveSub: "नियम राज्यों के अनुसार अलग होते हैं।", stateLabel: "अपने राज्य/केंद्र शासित प्रदेश का चयन करें", stateChoose: "-- राज्य चुनें --", idTitle: "क्या आपके पास वोटर आईडी है?", idSub: "इसे EPIC कार्ड भी कहते हैं।", idYes: "हाँ, मेरे पास है", idNo: "नहीं, पंजीकरण करना है", idUnsure: "मुझे यकीन नहीं है", back: "पीछे", continue: "जारी रखें", finish: "रोडमैप प्राप्त करें" },
    dashboard: { title: "आपका मतदान रोडमैप", personalized: "व्यक्तिगत विवरण:", days: "चुनाव तक शेष दिन", guide: "चरण-दर-चरण मार्गदर्शिका", deadline: "महत्वपूर्ण समय सीमा", regClose: "पंजीकरण समाप्त होगा", quick: "त्वरित कार्रवाई", portal: "पोर्टल पर जाएं", action: "कार्रवाई करें" },
    roadmap: { underageTitle: "18 वर्ष होने तक प्रतीक्षा करें", underageDesc: "वोट देने के लिए आपकी उम्र 18 होनी चाहिए।", regTitle: "वोटर आईडी के लिए पंजीकरण (फॉर्म 6)", verifyTitle: "मतदाता सूची में नाम सत्यापित करें", verifyDesc: "सुनिश्चित करें कि आपका नाम आपकी निर्वाचन क्षेत्र सूची में है।", boothTitle: "मतदान केंद्र खोजें", boothDesc: "चुनाव के दिन आपको कहाँ जाना है, इसका पता लगाएं।", docsTitle: "दस्तावेज तैयार करें", docsDesc: "वोटर आईडी पर्ची + सरकारी आईडी", voteTitle: "अपना वोट डालें", day: "चुनाव का दिन", deadline: "अंतिम तिथि" },
    learn: { header: "ज्ञान केंद्र", sub: "लोकतांत्रिक प्रक्रिया के बारे में वह सब कुछ जो आपको जानना चाहिए।", tab1: "चरण मार्गदर्शिका", tab2: "तैयारी प्रश्नोत्तरी", g1Title: "1. पंजीकरण की मूल बातें", g1Sub: "पंजीकरण करने के लिए, आपको फॉर्म 6 भरना होगा। आप इसे ऑनलाइन या ऑफलाइन कर सकते हैं।", g1L1: "18 वर्ष के हों", g1L2: "पते का प्रमाण रखें", g1L3: "पासपोर्ट फोटो रखें", g2Title: "2. आवश्यक दस्तावेज", g2Sub: "चुनाव के दिन, आपको वोटर स्लिप और फोटो आईडी ले जाना चाहिए।", g2L1: "वोटर आईडी कार्ड (EPIC)", g2L2: "आधार कार्ड या पैन", g2L3: "ड्राइविंग लाइसेंस या पासपोर्ट", g3Title: "3. मतदान की प्रक्रिया", g3Sub: "बूथ के अंदर, यहाँ बताया गया है कि क्या होता है:", g3L1: "अधिकारी आपकी आईडी की जांच करता है", g3L2: "उंगली पर स्याही लगाई जाती है", g3L3: "EVM पर बटन दबाएं" },
    quiz: { introTitle: "क्या आप वोट देने के लिए तैयार हैं?", introSub: "अपने ज्ञान का परीक्षण करने के लिए यह प्रश्नोत्तरी लें।", startBtn: "प्रश्नोत्तरी शुरू करें", resultTitle: "प्रश्नोत्तरी पूरी हुई!", perfect: "बढ़िया! आप चुनाव के लिए पूरी तरह तैयार हैं।", keepLearning: "अच्छा काम! थोड़ा और जानने के लिए 'चरण मार्गदर्शिका' देखें।", retake: "पुनः प्रयास करें", q1: "भारत में वोट देने की न्यूनतम आयु क्या है?", q1O1: "16 वर्ष", q1O2: "18 वर्ष", q1O3: "21 वर्ष", q2: "वोटर आईडी न होने पर इनमें से कौन सा मान्य है?", q2O1: "आधार कार्ड", q2O2: "जिम मेंबरशिप कार्ड", q2O3: "बिजली का बिल", q3: "क्या आप घर से ऑनलाइन वोट दे सकते हैं?", q3O1: "हाँ, ऐप के माध्यम से", q3O2: "नहीं, आपको बूथ पर जाना होगा", q3O3: "हाँ, यदि पंजीकृत हैं" }
  },
  bn: {
    nav: { getStarted: "শুরু করুন", journey: "আমার যাত্রা", locator: "বুথ লোকেটার", assistant: "এআই সহকারী" },
    hero: { badge: "নির্বাচন 2026 প্রস্তুত", title1: "ভোট দেওয়ার জন্য আপনার ", titleHighlight: "গাইড", subtitle: "রেজিস্ট্রেশন থেকে ভোটদান পর্যন্ত আমরা আপনাকে সাহায্য করি।", btnStart: "শুরু করুন", btnLearn: "প্রক্রিয়া জানুন" },
    how: { header: "কিভাবে এটা কাজ করে", s1Title: "আমাদের আপনার সম্পর্কে বলুন", s1Sub: "৩টি সহজ প্রশ্নের উত্তর দিন।", s2Title: "রোডম্যাপ পান", s2Sub: "প্রস্তুত থাকার জন্য চেকলিস্ট অনুসরণ করুন।", s3Title: "ভোট দিন", s3Sub: "বিশ্বাসের সাথে ভোট দিন।" },
    onboarding: { step: "ধাপ", ageTitle: "আপনার বয়স কত?", ageOption1: "১৮ এর কম", ageOption2: "১৮ - ২১", ageOption3: "২১ এর বেশি", liveTitle: "আপনি কোথায় থাকেন?", idTitle: "আপনার কি ভোটার আইডি আছে?", back: "পিছনে", continue: "চালিয়ে যান", finish: "রোডম্যাপ পান" },
    dashboard: { title: "আপনার ভোটিং রোডম্যাপ", days: "নির্বাচন পর্যন্ত দিন", guide: "ধাপে ধাপে নির্দেশিকা", portal: "পোর্টালে যান", action: "পদক্ষেপ নিন" },
    roadmap: { regTitle: "ভোটার আইডির জন্য আবেদন (ফর্ম ৬)", boothTitle: "ভোটদান কেন্দ্র খুঁজুন", voteTitle: "ভোট দিন" }
  },
  te: {
    nav: { getStarted: "ప్రారంభించండి", journey: "నా ప్రయాణం", locator: "బూత్ లొకేటర్", assistant: "AI అసిస్టెంట్" },
    hero: { badge: "ఎన్నికలు 2026 సిద్ధంగా ఉన్నాయి", title1: "ఓటింగ్ కోసం మీ దశల వారీ ", titleHighlight: "మార్గదర్శి", subtitle: "నమోదు నుండి ఓటు వేయడం వరకు మేము మీకు సహాయం చేస్తాము.", btnStart: "ప్రారంభించండి", btnLearn: "ప్రక్రియ తెలుసుకోండి" },
    how: { header: "ఇది ఎలా పని చేస్తుంది", s1Title: "మీ గురించి మాకు చెప్పండి", s1Sub: "3 చిన్న ప్రశ్నలకు సమాధానం ఇవ్వండి.", s2Title: "రోడ్‌ಮ్యాಪ್ పొందండి", s2Sub: "సిద్ధంగా ఉండటానికి చెక్‌లిస్ట్‌ను అనుసరించండి.", s3Title: "ఓటు వేయండి", s3Sub: "నమ్మకంతో ఓటు వేయండి." },
    onboarding: { step: "దశ", ageTitle: "మీ వయస్సు ఎంత?", ageOption1: "18 లోపు", ageOption2: "18 - 21", ageOption3: "21 పైన", liveTitle: "మీరు ఎక్కడ నివసిస్తున్నారు?", idTitle: "మీకు ఓటర్ ఐడి ఉందా?", back: "వెనుకకు", continue: "కొనసాగించండి", finish: "రోడ్‌మ್ಯಾಪ್ పొందండి" },
    dashboard: { title: "మీ ఓటింగ్ రోడ్‌మ్యాప్", days: "ఎన్నికలకు రోజులు", guide: "దశల వారీ మార్గదర్శి", portal: "పోర్టల్‌కు వెళ్లండి", action: "చర్య తీసుకోండి" },
    roadmap: { regTitle: "ఓటర్ ఐడి కోసం నమోదు (ఫారమ్ 6)", boothTitle: "పోలింగ్ బూత్ కనుగొనండి", voteTitle: "ఓటు వేయండి" }
  },
  mr: {
    nav: { getStarted: "सुरू करा", journey: "माझा प्रवास", locator: "बूथ लोकेटर", assistant: "एआय सहाय्यक" },
    hero: { badge: "निवडणूक 2026 तयार", title1: "मतदानासाठी तुमचे टप्प्याटप्प्याने ", titleHighlight: "मार्गदर्शक", subtitle: "नोंदणीपासून मतदानापर्यंत आम्ही तुम्हाला मदत करतो.", btnStart: "सुरू करा", btnLearn: "प्रक्रिया जाणून घ्या" },
    how: { header: "हे कसे कार्य करते", s1Title: "तुमच्याबद्दल सांगा", s1Sub: "३ सोप्या प्रश्नांची उत्तरे द्या.", s2Title: "रोडमॅप मिळवा", s2Sub: "तयार राहण्यासाठी चेकलिस्ट फॉलो करा.", s3Title: "मतदान करा", s3Sub: "आत्मविश्वासाने मतदान करा." },
    onboarding: { step: "टप्पा", ageTitle: "तुमचे वय किती आहे?", ageOption1: "१८ पेक्षा कमी", ageOption2: "१८ - २१", ageOption3: "२१ पेक्षा जास्त", liveTitle: "तुम्ही कुठे राहता?", idTitle: "तुमच्याकडे मतदार ओळखपत्र आहे का?", back: "मागे", continue: "पुढील", finish: "रोडमॅप मिळवा" },
    dashboard: { title: "तुमचा मतदान रोडमॅप", days: "निवडणुकीपर्यंत दिवस", guide: "टप्प्याटप्प्याने मार्गदर्शिका", portal: "पोर्टलवर जा", action: "कृती करा" },
    roadmap: { regTitle: "मतदार ओळखपत्रासाठी नोंदणी (फॉर्म ६)", boothTitle: "मतदान केंद्र शोधा", voteTitle: "मतदान करा" }
  },
  ta: {
    nav: { getStarted: "தொடங்கு", journey: "பயணம்", locator: "சாவடி", assistant: "AI உதவியாளர்" },
    hero: { badge: "தேர்தல் 2026 தயார்", titleHighlight: "வழிகாட்டி", subtitle: "பதிவு முதல் வாக்களிப்பு வரை வழிகாட்டுகிறோம்.", btnStart: "தொடங்கு", btnLearn: "அறிக" },
    how: { header: "எப்படி செயல்படுகிறது", s1Title: "உங்களைப் பற்றி சொல்லுங்கள்", s1Sub: "3 கேள்விகளுக்கு பதிலளிக்கவும்.", s2Title: "வரைபடம்", s3Title: "வாக்களிக்கவும்" },
    onboarding: { step: "படி", ageTitle: "வயது என்ன?", ageOption1: "18க்கு கீழ்", ageOption2: "18 - 21", ageOption3: "21க்கு மேல்", liveTitle: "எங்கு வசிக்கிறீர்கள்?", idTitle: "வாக்காளர் அடையாள அட்டை உள்ளதா?", back: "பின்", continue: "தொடரவும்", finish: "வரைபடம்" },
    dashboard: { title: "வாக்களிப்பு வரைபடம்", days: "மீதமுள்ள நாட்கள்", guide: "வழிகாட்டி", portal: "நுழைய", action: "செயல்படுக" },
    roadmap: { regTitle: "பதிவு செய்க (படிவம் 6)", boothTitle: "சாவடியைக் கண்டறியவும்", voteTitle: "வாக்களிக்கவும்" }
  },
  ur: {
    nav: { getStarted: "شروع کریں", journey: "میرا سفر", locator: "بوتھ", assistant: "اسسٹنٹ" },
    hero: { badge: "تیار الیکشن 2026", titleHighlight: "رہنمائی", subtitle: "رجسٹریشن سے ووٹ تک رہنمائی۔", btnStart: "شروع", btnLearn: "عمل جانیں" },
    how: { header: "یہ کیسے کام کرتا ہے", s1Title: "اپنے بارے میں بتائیں", s2Title: "روڈ میپ", s3Title: "ووٹ ڈالیں" },
    onboarding: { step: "مرحلہ", ageTitle: "عمر کیا ہے؟", ageOption1: "18 سے کم", ageOption2: "18 - 21", ageOption3: "21 سے زیادہ", liveTitle: "کہاں رہتے ہیں؟", idTitle: "ووٹر آئی ڈی ہے؟", back: "پیچھے", continue: "جاری", finish: "روڈ میپ" },
    dashboard: { title: "ووٹنگ روڈ میپ", days: "الیکشن تک دن", guide: "گائیڈ", portal: "پورٹل", action: "عمل کریں" },
    roadmap: { regTitle: "رجسٹریشن (فارم 6)", boothTitle: "بوتھ تلاش کریں", voteTitle: "ووٹ ڈالیں" }
  },
  gu: {
    nav: { getStarted: "શરૂ કરો", journey: "મારી યાત્રા", locator: "બૂથ", assistant: "સહાયક" },
    hero: { badge: "ચૂંટણી 2026 તૈયાર", titleHighlight: "માર્ગદર્શિકા", subtitle: "નોંધણીથી મતદાન સુધી માર્ગદર્શન.", btnStart: "શરૂ કરો", btnLearn: "જાણો" },
    how: { header: "કેવી રીતે કામ કરે છે", s1Title: "તમારા વિશે જણાવો", s2Title: "રોડમેપ", s3Title: "મતદાન કરો" },
    onboarding: { step: "પગલું", ageTitle: "ઉંમર કેટલી?", ageOption1: "18 થી ઓછી", ageOption2: "18 - 21", ageOption3: "21 થી વધુ", liveTitle: "ક્યાં રહો છો?", idTitle: "મતદાર આઈડી છે?", back: "પાછળ", continue: "આગળ", finish: "રોડમેપ" },
    dashboard: { title: "મતદાન રોડમેપ", days: "ચૂંટણી સુધીના દિવસો", guide: "માર્ગદર્શિકા", portal: "પોર્ટલ પર જાઓ", action: "પગલું લો" },
    roadmap: { regTitle: "મતદાર આઈડી નોંધણી (ફોર્મ 6)", boothTitle: "બૂથ શોધો", voteTitle: "મતદાન કરો" }
  },
  kn: {
    nav: { getStarted: "ಪ್ರಾರಂಭಿಸಿ", journey: "ಪ್ರಯಾಣ", locator: "ಮತಗಟ್ಟೆ", assistant: "ಸಹಾಯಕ" },
    hero: { badge: "ಸಿದ್ಧ ಚುನಾವಣೆ 2026", titleHighlight: "ಮಾರ್ಗದರ್ಶಿ", subtitle: "ನೋಂದಣಿಯಿಂದ ಮತದಾನದವರೆಗೆ ಮಾರ್ಗದರ್ಶನ.", btnStart: "ಪ್ರಾರಂಭ", btnLearn: "ತಿಳಿಯಿರಿ" },
    how: { header: "ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", s1Title: "ನಿಮ್ಮ ಬಗ್ಗೆ ತಿಳಿಸಿ", s2Title: "ರೋಡ್‌ಮ್ಯಾಪ್", s3Title: "ಮತದಾನ ಮಾಡಿ" },
    onboarding: { step: "ಹಂತ", ageTitle: "ವಯಸ್ಸು ಎಷ್ಟು?", ageOption1: "18ಕ್ಕಿಂತ ಕಡಿಮೆ", ageOption2: "18 - 21", ageOption3: "21ಕ್ಕಿಂತ ಹೆಚ್ಚು", liveTitle: "ಎಲ್ಲಿ ವಾಸ?", idTitle: "ವೋಟರ್ ಐಡಿ ಇದೆಯೇ?", back: "ಹಿಂದಕ್ಕೆ", continue: "ಮುಂದುವರಿಸಿ", finish: "ರೋಡ್‌ಮ್ಯಾಪ್" },
    dashboard: { title: "ಮತದಾನ ರೋಡ್‌ಮ್ಯಾಪ್", days: "ಚುನಾವಣೆಗೆ ದಿನಗಳು", guide: "ಮಾರ್ಗದರ್ಶಿ", portal: "ಪೋರ್ಟಲ್", action: "ಕ್ರಮ ಕೈಗೊಳ್ಳಿ" },
    roadmap: { regTitle: "ವೋಟರ್ ಐಡಿ ನೋಂದಣಿ (ಫಾರ್ಮ್ 6)", boothTitle: "ಮತಗಟ್ಟೆ ಹುಡುಕಿ", voteTitle: "ಮತದಾನ ಮಾಡಿ" }
  },
  or: {
    nav: { getStarted: "ଆରମ୍ଭ", journey: "ଯାત୍ରା", locator: "ବୁଥ୍", assistant: "ସହାୟକ" },
    hero: { badge: "ନିର୍ବାଚନ 2026 ପ୍ରସ୍ତୁତ", titleHighlight: "ଗାଇଡ୍", subtitle: "ପଞ୍ଜୀକରଣରୁ ଭୋଟ୍ ପର୍ଯ୍ୟନ୍ତ ଗାଇଡ୍।", btnStart: "ଆରମ୍ଭ", btnLearn: "ଜାଣନ୍ତু" },
    how: { header: "କିପରି କାମ କରେ", s1Title: "ଆପଣଙ୍କ ବିଷୟରେ କୁହନ୍ତୁ", s2Title: "ରୋଡମ୍ୟାପ୍", s3Title: "ଭୋଟ୍ ଦିଅନ୍ତୁ" },
    onboarding: { step: "ପର୍ଯ୍ୟାୟ", ageTitle: "ବୟସ କେତେ?", ageOption1: "18 ରୁ କମ୍", ageOption2: "18 - 21", ageOption3: "21 ରୁ ଅଧିକ", liveTitle: "କେଉଁଠି ରହନ୍ତି?", idTitle: "ଭୋଟର ଆଇଡି ଅଛି?", back: "ପଛ", continue: "ଆଗକୁ", finish: "ରୋଡମ୍ୟାପ୍" },
    dashboard: { title: "ଭୋଟିଂ ରୋଡମ୍ୟାପ୍", days: "ନିର୍ବାଚନ ପର୍ଯ୍ୟନ୍ତ ଦିନ", guide: "ଗାଇଡ୍", portal: "ପୋର୍ଟାଲ୍ କୁ ଯାଆନ୍ତୁ", action: "ପଦକ୍ଷେପ ନିଅନ୍ତୁ" },
    roadmap: { regTitle: "ଭୋଟର ଆଇଡି ପଞ୍ଜୀକରଣ (ଫର୍ମ 6)", boothTitle: "ବୁଥ୍ ଖୋଜନ୍ତୁ", voteTitle: "ଭୋଟ୍ ଦିଅନ୍ତୁ" }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = (section, key) => {
    return translations[lang]?.[section]?.[key] || translations['en']?.[section]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
