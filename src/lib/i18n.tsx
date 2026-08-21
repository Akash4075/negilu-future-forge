import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "kn";

type Dict = Record<string, [string, string]>;

/** [English, Kannada] */
export const dict: Dict = {
  "brand.name": ["NEGILU MACHINERY", "ನೆಗಿಲು ಮೆಷಿನರಿ"],
  "brand.tagline": [
    "Engineering the Future of Agriculture.",
    "ಕೃಷಿಯ ಭವಿಷ್ಯವನ್ನು ನಿರ್ಮಿಸುತ್ತಿದ್ದೇವೆ",
  ],

  "nav.home": ["Home", "ಮುಖಪುಟ"],
  "nav.machines": ["Machines", "ಯಂತ್ರಗಳು"],
  "nav.technology": ["Technology", "ತಂತ್ರಜ್ಞಾನ"],
  "nav.about": ["About", "ನಮ್ಮ ಬಗ್ಗೆ"],
  "nav.team": ["Team", "ತಂಡ"],
  "nav.contact": ["Contact", "ಸಂಪರ್ಕ"],
  "nav.order": ["Track Order", "ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್"],
  "nav.faq": ["FAQ", "ಪ್ರಶ್ನೆಗಳು"],
  "nav.bookNow": ["Book Now", "ಈಗ ಬುಕ್ ಮಾಡಿ"],
  "nav.menu": ["Menu", "ಮೆನು"],
  "nav.close": ["Close", "ಮುಚ್ಚಿ"],
  "nav.book": ["Book", "ಬುಕ್"],

  "cta.bookMachine": ["Book Your Machine", "ನಿಮ್ಮ ಯಂತ್ರವನ್ನು ಬುಕ್ ಮಾಡಿ"],
  "cta.bookAMachine": ["Book a Machine", "ಯಂತ್ರವನ್ನು ಬುಕ್ ಮಾಡಿ"],
  "cta.explore": ["Explore Our Machines", "ನಮ್ಮ ಯಂತ್ರಗಳನ್ನು ನೋಡಿ"],
  "cta.talk": ["Talk to Our Team", "ನಮ್ಮ ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ"],
  "cta.exploreMachine": ["Explore Machine", "ಯಂತ್ರವನ್ನು ನೋಡಿ"],
  "cta.bookThis": ["Book This Machine", "ಈ ಯಂತ್ರವನ್ನು ಬುಕ್ ಮಾಡಿ"],
  "cta.exploreTech": ["Explore Our Technology", "ನಮ್ಮ ತಂತ್ರಜ್ಞಾನವನ್ನು ನೋಡಿ"],
  "cta.follow": ["Follow Our Journey", "ನಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಅನುಸರಿಸಿ"],

  "hero.label": ["NEGILU MACHINERY • INDIA", "ನೆಗಿಲು ಮೆಷಿನರಿ • ಭಾರತ"],
  "hero.l1": ["ENGINEERING", "ಕೃಷಿಯ"],
  "hero.l2": ["THE FUTURE", "ಭವಿಷ್ಯವನ್ನು"],
  "hero.l3": ["OF AGRICULTURE.", "ನಿರ್ಮಿಸುತ್ತಿದ್ದೇವೆ."],
  "hero.sub": [
    "Smart machines. Practical engineering. Better farming.",
    "ಸ್ಮಾರ್ಟ್ ಯಂತ್ರಗಳು. ಪ್ರಾಯೋಗಿಕ ಎಂಜಿನಿಯರಿಂಗ್. ಉತ್ತಮ ಕೃಷಿ.",
  ],
  "hero.scroll": ["Scroll to explore", "ಸ್ಕ್ರೋಲ್ ಮಾಡಿ ನೋಡಿ"],
  "hero.loading": ["LOADING MACHINE...", "ಯಂತ್ರ ಲೋಡ್ ಆಗುತ್ತಿದೆ..."],

  "quick.title": ["NEED A MACHINE?", "ಯಂತ್ರ ಬೇಕೇ?"],
  "quick.sub": [
    "Tell us what you need. We'll help you find the right solution.",
    "ನಿಮಗೆ ಏನು ಬೇಕು ಎಂದು ತಿಳಿಸಿ. ಸರಿಯಾದ ಪರಿಹಾರವನ್ನು ಹುಡುಕಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
  ],

  "machines.title": ["MACHINES BUILT FOR THE FIELD.", "ಹೊಲಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾದ ಯಂತ್ರಗಳು."],
  "machines.sub": [
    "Engineered to solve real agricultural problems.",
    "ನಿಜವಾದ ಕೃಷಿ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
  ],
  "machines.more": ["MORE MACHINES ARE COMING.", "ಇನ್ನಷ್ಟು ಯಂತ್ರಗಳು ಬರುತ್ತಿವೆ."],
  "machines.moreSub": [
    "Our engineering team is continuously developing new agricultural machinery.",
    "ನಮ್ಮ ಎಂಜಿನಿಯರಿಂಗ್ ತಂಡ ನಿರಂತರವಾಗಿ ಹೊಸ ಕೃಷಿ ಯಂತ್ರಗಳನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸುತ್ತಿದೆ.",
  ],
  "machines.specs": ["Specifications", "ವಿಶೇಷತೆಗಳು"],
  "machines.features": ["Key Features", "ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು"],

  "m.robot.name": ["NEGILU SMART FARM ROBOT", "ನೆಗಿಲು ಸ್ಮಾರ್ಟ್ ಫಾರ್ಮ್ ರೋಬೋಟ್"],
  "m.robot.cat": ["Agricultural Robotics", "ಕೃಷಿ ರೊಬೊಟಿಕ್ಸ್"],
  "m.robot.desc": [
    "An autonomous field platform built to handle repetitive farm operations with machine vision and precise motor control.",
    "ಯಂತ್ರ ದೃಷ್ಟಿ ಮತ್ತು ನಿಖರ ಮೋಟಾರ್ ನಿಯಂತ್ರಣದೊಂದಿಗೆ ಪುನರಾವರ್ತಿತ ಕೃಷಿ ಕೆಲಸಗಳನ್ನು ನಿರ್ವಹಿಸಲು ನಿರ್ಮಿಸಲಾದ ಸ್ವಯಂಚಾಲಿತ ವೇದಿಕೆ.",
  ],
  "m.silk.name": ["SILKWORM FARM AUTOMATION", "ರೇಷ್ಮೆ ಹುಳು ಫಾರ್ಮ್ ಆಟೊಮೇಷನ್"],
  "m.silk.cat": ["Smart Sericulture", "ಸ್ಮಾರ್ಟ್ ರೇಷ್ಮೆ ಕೃಷಿ"],
  "m.silk.desc": [
    "Climate, feeding and monitoring automation for rearing houses, designed around how sericulture farms actually work.",
    "ರೇಷ್ಮೆ ಸಾಕಣೆ ಮನೆಗಳಿಗೆ ಹವಾಮಾನ, ಆಹಾರ ಮತ್ತು ಮೇಲ್ವಿಚಾರಣೆ ಆಟೊಮೇಷನ್.",
  ],
  "m.irrigation.name": ["SMART IRRIGATION", "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ"],
  "m.irrigation.cat": ["Water & Irrigation Automation", "ನೀರು ಮತ್ತು ನೀರಾವರಿ ಆಟೊಮೇಷನ್"],
  "m.irrigation.desc": [
    "Sensor-driven irrigation control with remote operation, so water goes where it is needed and nowhere else.",
    "ಸಂವೇದಕ ಆಧಾರಿತ ನೀರಾವರಿ ನಿಯಂತ್ರಣ, ದೂರದಿಂದ ಕಾರ್ಯಾಚರಣೆ ಸಾಧ್ಯ.",
  ],
  "m.custom.name": ["OTHER / CUSTOM REQUIREMENT", "ಇತರ / ಕಸ್ಟಮ್ ಅಗತ್ಯ"],
  "m.custom.cat": ["Custom Engineering", "ಕಸ್ಟಮ್ ಎಂಜಿನಿಯರಿಂಗ್"],
  "m.custom.desc": [
    "Describe the problem on your farm and our engineering team will evaluate a solution.",
    "ನಿಮ್ಮ ಹೊಲದ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ, ನಮ್ಮ ತಂಡ ಪರಿಹಾರವನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.",
  ],

  "viewer.title": ["GET CLOSER TO THE MACHINE.", "ಯಂತ್ರವನ್ನು ಹತ್ತಿರದಿಂದ ನೋಡಿ."],
  "viewer.sub": [
    "Drag to rotate. Tap a hotspot to inspect a system.",
    "ತಿರುಗಿಸಲು ಎಳೆಯಿರಿ. ವ್ಯವಸ್ಥೆಯನ್ನು ನೋಡಲು ಹಾಟ್‌ಸ್ಪಾಟ್ ಒತ್ತಿ.",
  ],
  "viewer.rotate": ["Rotate", "ತಿರುಗಿಸಿ"],
  "viewer.zoomIn": ["Zoom in", "ಜೂಮ್ ಇನ್"],
  "viewer.zoomOut": ["Zoom out", "ಜೂಮ್ ಔಟ್"],
  "viewer.fullscreen": ["Fullscreen", "ಪೂರ್ಣ ಪರದೆ"],
  "hs.camera": ["AI CAMERA", "ಎಐ ಕ್ಯಾಮೆರಾ"],
  "hs.camera.d": [
    "Used for intelligent monitoring and machine vision applications.",
    "ಬುದ್ಧಿವಂತ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಯಂತ್ರ ದೃಷ್ಟಿ ಅನ್ವಯಗಳಿಗೆ ಬಳಸಲಾಗುತ್ತದೆ.",
  ],
  "hs.motor": ["MOTOR SYSTEM", "ಮೋಟಾರ್ ವ್ಯವಸ್ಥೆ"],
  "hs.motor.d": [
    "Independent drive units deliver traction control across uneven field surfaces.",
    "ಅಸಮ ಹೊಲದ ಮೇಲ್ಮೈಯಲ್ಲಿ ಎಳೆತ ನಿಯಂತ್ರಣ ನೀಡುವ ಸ್ವತಂತ್ರ ಡ್ರೈವ್ ಘಟಕಗಳು.",
  ],
  "hs.battery": ["BATTERY", "ಬ್ಯಾಟರಿ"],
  "hs.battery.d": [
    "Swappable pack with a battery management system for long field sessions.",
    "ದೀರ್ಘ ಕೆಲಸಕ್ಕಾಗಿ ಬ್ಯಾಟರಿ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆಯುಳ್ಳ ಬದಲಾಯಿಸಬಹುದಾದ ಪ್ಯಾಕ್.",
  ],
  "hs.sprayer": ["SPRAYER", "ಸ್ಪ್ರೇಯರ್"],
  "hs.sprayer.d": [
    "Targeted spray module for controlled, reduced-waste application.",
    "ನಿಯಂತ್ರಿತ, ಕಡಿಮೆ ವ್ಯರ್ಥದ ಸಿಂಪಡಣೆಗಾಗಿ ಗುರಿಯಿಟ್ಟ ಸ್ಪ್ರೇ ಮಾಡ್ಯೂಲ್.",
  ],
  "hs.sensors": ["SENSORS", "ಸಂವೇದಕಗಳು"],
  "hs.sensors.d": [
    "Environment and position sensing feeds the control system in real time.",
    "ಪರಿಸರ ಮತ್ತು ಸ್ಥಾನ ಸಂವೇದನೆ ನಿಯಂತ್ರಣ ವ್ಯವಸ್ಥೆಗೆ ನೈಜ ಸಮಯದಲ್ಲಿ ಮಾಹಿತಿ ನೀಡುತ್ತದೆ.",
  ],

  "story.01": ["BUILT FOR THE FIELD.", "ಹೊಲಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ."],
  "story.02": ["ENGINEERED FOR REAL-WORLD AGRICULTURE.", "ನಿಜ ಜಗತ್ತಿನ ಕೃಷಿಗಾಗಿ ವಿನ್ಯಾಸ."],
  "story.03": ["INTELLIGENCE INSIDE.", "ಒಳಗೆ ಬುದ್ಧಿಮತ್ತೆ."],
  "story.04": ["AUTOMATION OUTSIDE.", "ಹೊರಗೆ ಆಟೊಮೇಷನ್."],
  "story.05": ["TECHNOLOGY THAT WORKS FOR FARMERS.", "ರೈತರಿಗಾಗಿ ಕೆಲಸ ಮಾಡುವ ತಂತ್ರಜ್ಞಾನ."],
  "story.06": ["READY TO BOOK YOUR MACHINE?", "ನಿಮ್ಮ ಯಂತ್ರವನ್ನು ಬುಕ್ ಮಾಡಲು ಸಿದ್ಧವೇ?"],

  "why.title": ["NOT JUST MACHINERY.", "ಕೇವಲ ಯಂತ್ರಗಳಲ್ಲ."],
  "why.1": ["SMARTER.", "ಚುರುಕಾದ."],
  "why.2": ["STRONGER.", "ಬಲಿಷ್ಠ."],
  "why.3": ["CONNECTED.", "ಸಂಪರ್ಕಿತ."],
  "why.4": ["BUILT FOR INDIA.", "ಭಾರತಕ್ಕಾಗಿ ನಿರ್ಮಿತ."],
  "why.5": ["MADE TO WORK.", "ಕೆಲಸಕ್ಕಾಗಿ ಮಾಡಲಾಗಿದೆ."],
  "tech.automation": ["AUTOMATION", "ಆಟೊಮೇಷನ್"],
  "tech.robotics": ["ROBOTICS", "ರೊಬೊಟಿಕ್ಸ್"],
  "tech.iot": ["IoT", "ಐಒಟಿ"],
  "tech.ai": ["AI", "ಎಐ"],
  "tech.embedded": ["EMBEDDED SYSTEMS", "ಎಂಬೆಡೆಡ್ ಸಿಸ್ಟಮ್ಸ್"],
  "tech.remote": ["REMOTE CONTROL", "ದೂರ ನಿಯಂತ್ರಣ"],

  "eng.title": ["INSIDE THE ENGINEERING.", "ಎಂಜಿನಿಯರಿಂಗ್ ಒಳಗೆ."],
  "eng.sensors": ["SENSORS", "ಸಂವೇದಕಗಳು"],
  "eng.control": ["CONTROL SYSTEM", "ನಿಯಂತ್ರಣ ವ್ಯವಸ್ಥೆ"],
  "eng.intel": ["INTELLIGENCE", "ಬುದ್ಧಿಮತ್ತೆ"],
  "eng.motors": ["MOTORS & ACTUATORS", "ಮೋಟಾರ್ ಮತ್ತು ಆಕ್ಚುಯೇಟರ್"],
  "eng.machine": ["MACHINE", "ಯಂತ್ರ"],
  "eng.farmer": ["FARMER", "ರೈತ"],

  "farmer.title": ["TECHNOLOGY SHOULD WORK FOR FARMERS.", "ತಂತ್ರಜ್ಞಾನ ರೈತರಿಗಾಗಿ ಕೆಲಸ ಮಾಡಬೇಕು."],
  "farmer.1": ["LESS REPETITIVE WORK.", "ಕಡಿಮೆ ಪುನರಾವರ್ತಿತ ಕೆಲಸ."],
  "farmer.2": ["MORE CONTROL.", "ಹೆಚ್ಚು ನಿಯಂತ್ರಣ."],
  "farmer.3": ["SMARTER OPERATIONS.", "ಚುರುಕಾದ ಕಾರ್ಯಾಚರಣೆ."],

  "about.title": ["WE DON'T JUST BUILD MACHINES.", "ನಾವು ಕೇವಲ ಯಂತ್ರಗಳನ್ನು ನಿರ್ಮಿಸುವುದಿಲ್ಲ."],
  "about.lead": [
    "We build technology to solve real problems in agriculture.",
    "ಕೃಷಿಯಲ್ಲಿನ ನಿಜವಾದ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ನಾವು ತಂತ್ರಜ್ಞಾನವನ್ನು ನಿರ್ಮಿಸುತ್ತೇವೆ.",
  ],
  "about.why": ["WHY WE EXIST", "ನಾವು ಏಕೆ ಇದ್ದೇವೆ"],
  "about.why.d": [
    "Agriculture needs practical technology.",
    "ಕೃಷಿಗೆ ಪ್ರಾಯೋಗಿಕ ತಂತ್ರಜ್ಞಾನ ಬೇಕು.",
  ],
  "about.what": ["WHAT WE BUILD", "ನಾವು ಏನು ನಿರ್ಮಿಸುತ್ತೇವೆ"],
  "about.what.d": [
    "Machines, automation and intelligent systems.",
    "ಯಂತ್ರಗಳು, ಆಟೊಮೇಷನ್ ಮತ್ತು ಬುದ್ಧಿವಂತ ವ್ಯವಸ್ಥೆಗಳು.",
  ],
  "about.where": ["WHERE WE'RE GOING", "ನಾವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೇವೆ"],
  "about.where.d": [
    "A future where farmers can access powerful technology without unnecessary complexity.",
    "ಅನಗತ್ಯ ಸಂಕೀರ್ಣತೆಯಿಲ್ಲದೆ ರೈತರಿಗೆ ಶಕ್ತಿಶಾಲಿ ತಂತ್ರಜ್ಞಾನ ಲಭ್ಯವಾಗುವ ಭವಿಷ್ಯ.",
  ],
  "journey.title": ["OUR JOURNEY", "ನಮ್ಮ ಪ್ರಯಾಣ"],
  "journey.idea": ["IDEA", "ಕಲ್ಪನೆ"],
  "journey.eng": ["ENGINEERING", "ಎಂಜಿನಿಯರಿಂಗ್"],
  "journey.proto": ["PROTOTYPE", "ಮಾದರಿ"],
  "journey.test": ["FIELD TEST", "ಹೊಲ ಪರೀಕ್ಷೆ"],
  "journey.machine": ["MACHINE", "ಯಂತ್ರ"],
  "journey.farm": ["FARM", "ಹೊಲ"],

  "book.title": ["BOOK YOUR MACHINE", "ನಿಮ್ಮ ಯಂತ್ರವನ್ನು ಬುಕ್ ಮಾಡಿ"],
  "book.step1": ["MACHINE", "ಯಂತ್ರ"],
  "book.step2": ["REQUIREMENTS", "ಅಗತ್ಯಗಳು"],
  "book.step3": ["CUSTOMER", "ಗ್ರಾಹಕ"],
  "book.step4": ["CONFIRM", "ದೃಢೀಕರಣ"],
  "book.selectMachine": ["Select your machine", "ನಿಮ್ಮ ಯಂತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ"],
  "book.purpose": ["What do you need the machine for?", "ಯಂತ್ರ ಯಾವ ಕೆಲಸಕ್ಕೆ ಬೇಕು?"],
  "book.farmType": ["Farm type", "ಕೃಷಿ ಪ್ರಕಾರ"],
  "book.farmSize": ["Farm size", "ಹೊಲದ ಗಾತ್ರ"],
  "book.quantity": ["Quantity", "ಪ್ರಮಾಣ"],
  "book.additional": ["Additional requirements", "ಹೆಚ್ಚುವರಿ ಅಗತ್ಯಗಳು"],
  "book.name": ["Full Name", "ಪೂರ್ಣ ಹೆಸರು"],
  "book.phone": ["Phone Number", "ದೂರವಾಣಿ ಸಂಖ್ಯೆ"],
  "book.email": ["Email", "ಇಮೇಲ್"],
  "book.state": ["State", "ರಾಜ್ಯ"],
  "book.district": ["District", "ಜಿಲ್ಲೆ"],
  "book.village": ["Village / City", "ಗ್ರಾಮ / ನಗರ"],
  "book.contactMethod": ["Preferred contact method", "ಆದ್ಯತೆಯ ಸಂಪರ್ಕ ವಿಧಾನ"],
  "book.summary": ["Booking summary", "ಬುಕಿಂಗ್ ಸಾರಾಂಶ"],
  "book.price": ["Estimated price", "ಅಂದಾಜು ಬೆಲೆ"],
  "book.priceTbd": ["Price will be confirmed", "ಬೆಲೆ ದೃಢೀಕರಿಸಲಾಗುವುದು"],
  "book.confirm": ["Confirm Booking", "ಬುಕಿಂಗ್ ದೃಢೀಕರಿಸಿ"],
  "book.received": ["BOOKING RECEIVED", "ಬುಕಿಂಗ್ ಸ್ವೀಕರಿಸಲಾಗಿದೆ"],
  "book.thanks": [
    "Thank you for choosing Negilu Machinery.",
    "ನೆಗಿಲು ಮೆಷಿನರಿಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.",
  ],
  "book.willContact": [
    "Our team will contact you shortly.",
    "ನಮ್ಮ ತಂಡ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
  ],
  "book.trackBooking": ["Track Booking", "ಬುಕಿಂಗ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ"],
  "book.backHome": ["Back to Home", "ಮುಖಪುಟಕ್ಕೆ"],
  "book.next": ["Next", "ಮುಂದೆ"],
  "book.back": ["Back", "ಹಿಂದೆ"],
  "book.required": ["Please complete the required fields.", "ದಯವಿಟ್ಟು ಅಗತ್ಯ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ."],

  "ft.agri": ["Agriculture", "ಕೃಷಿ"],
  "ft.seri": ["Sericulture", "ರೇಷ್ಮೆ ಕೃಷಿ"],
  "ft.irrigation": ["Irrigation", "ನೀರಾವರಿ"],
  "ft.spraying": ["Spraying", "ಸಿಂಪಡಣೆ"],
  "ft.transport": ["Transport", "ಸಾಗಣೆ"],
  "ft.other": ["Other", "ಇತರೆ"],
  "fs.1": ["< 1 acre", "< 1 ಎಕರೆ"],
  "fs.2": ["1–5 acres", "1–5 ಎಕರೆ"],
  "fs.3": ["5–10 acres", "5–10 ಎಕರೆ"],
  "fs.4": ["10+ acres", "10+ ಎಕರೆ"],
  "cm.phone": ["Phone", "ಫೋನ್"],
  "cm.whatsapp": ["WhatsApp", "ವಾಟ್ಸಾಪ್"],
  "cm.email": ["Email", "ಇಮೇಲ್"],

  "order.title": ["YOUR ORDER", "ನಿಮ್ಮ ಆರ್ಡರ್"],
  "order.sub": [
    "Enter your booking ID and phone number to see the current status.",
    "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿಯನ್ನು ನೋಡಲು ನಿಮ್ಮ ಬುಕಿಂಗ್ ಐಡಿ ಮತ್ತು ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.",
  ],
  "order.bookingId": ["Booking ID", "ಬುಕಿಂಗ್ ಐಡಿ"],
  "order.check": ["Check Status", "ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ"],
  "order.status": ["ORDER STATUS", "ಆರ್ಡರ್ ಸ್ಥಿತಿ"],
  "order.notFound": [
    "We couldn't find a booking with those details.",
    "ಆ ವಿವರಗಳೊಂದಿಗೆ ಬುಕಿಂಗ್ ಸಿಗಲಿಲ್ಲ.",
  ],
  "os.1": ["Booking Received", "ಬುಕಿಂಗ್ ಸ್ವೀಕೃತ"],
  "os.2": ["Team Contacted", "ತಂಡ ಸಂಪರ್ಕಿಸಿದೆ"],
  "os.3": ["Quotation", "ದರಪಟ್ಟಿ"],
  "os.4": ["Confirmed", "ದೃಢೀಕೃತ"],
  "os.5": ["Processing", "ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ"],
  "os.6": ["Ready / Dispatched", "ಸಿದ್ಧ / ರವಾನೆ"],
  "os.7": ["Completed", "ಪೂರ್ಣಗೊಂಡಿದೆ"],

  "team.title": ["PEOPLE BEHIND THE MACHINES.", "ಯಂತ್ರಗಳ ಹಿಂದಿನ ಜನರು."],
  "team.sub": ["Need help choosing a machine?", "ಯಂತ್ರ ಆಯ್ಕೆಗೆ ಸಹಾಯ ಬೇಕೇ?"],
  "team.charge": ["₹25 contact charge", "₹25 ಸಂಪರ್ಕ ಶುಲ್ಕ"],
  "team.callFor25": ["Call for ₹25", "₹25 ಗೆ ಕರೆ ಮಾಡಿ"],
  "team.contactFor25": ["Contact for ₹25", "₹25 ಗೆ ಸಂಪರ್ಕಿಸಿ"],
  "team.privacyNote": [
    "Team phone numbers are never shown publicly. The call is connected through a secure session after payment is verified.",
    "ತಂಡದ ಫೋನ್ ಸಂಖ್ಯೆಗಳನ್ನು ಸಾರ್ವಜನಿಕವಾಗಿ ತೋರಿಸುವುದಿಲ್ಲ. ಪಾವತಿ ಪರಿಶೀಲನೆಯ ನಂತರ ಸುರಕ್ಷಿತ ಸೆಷನ್ ಮೂಲಕ ಕರೆ ಸಂಪರ್ಕಗೊಳ್ಳುತ್ತದೆ.",
  ],
  "team.payTitle": ["Confirm ₹25 contact charge", "₹25 ಸಂಪರ್ಕ ಶುಲ್ಕ ದೃಢೀಕರಿಸಿ"],
  "team.payBody": [
    "A contact/call service charge of ₹25 applies. Payment is verified on our server before a secure call session is created. The team member's number is never revealed.",
    "₹25 ಸಂಪರ್ಕ/ಕರೆ ಸೇವಾ ಶುಲ್ಕ ಅನ್ವಯಿಸುತ್ತದೆ. ಸುರಕ್ಷಿತ ಕರೆ ಸೆಷನ್ ರಚಿಸುವ ಮೊದಲು ಪಾವತಿ ನಮ್ಮ ಸರ್ವರ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.",
  ],
  "team.payProceed": ["Proceed to pay ₹25", "₹25 ಪಾವತಿಸಲು ಮುಂದುವರಿಯಿರಿ"],
  "team.payPending": [
    "Payment gateway is not connected yet. Once Razorpay is enabled, this flow will create a verified contact session.",
    "ಪಾವತಿ ಗೇಟ್‌ವೇ ಇನ್ನೂ ಸಂಪರ್ಕಗೊಂಡಿಲ್ಲ. Razorpay ಸಕ್ರಿಯಗೊಂಡ ನಂತರ ಈ ಹರಿವು ಪರಿಶೀಲಿತ ಸಂಪರ್ಕ ಸೆಷನ್ ರಚಿಸುತ್ತದೆ.",
  ],
  "team.placeholder": [
    "Team profiles are editable placeholders until official details are published.",
    "ಅಧಿಕೃತ ವಿವರಗಳು ಪ್ರಕಟವಾಗುವವರೆಗೆ ತಂಡದ ಪ್ರೊಫೈಲ್‌ಗಳು ಸಂಪಾದಿಸಬಹುದಾದ ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್‌ಗಳಾಗಿವೆ.",
  ],
  "cancel": ["Cancel", "ರದ್ದುಮಾಡಿ"],

  "contact.title": ["LET'S TALK MACHINES.", "ಯಂತ್ರಗಳ ಬಗ್ಗೆ ಮಾತನಾಡೋಣ."],
  "contact.p1": ["Have a machine requirement?", "ಯಂತ್ರದ ಅಗತ್ಯವಿದೆಯೇ?"],
  "contact.p2": ["Need a quotation?", "ದರಪಟ್ಟಿ ಬೇಕೇ?"],
  "contact.p3": ["Want to partner with us?", "ನಮ್ಮೊಂದಿಗೆ ಪಾಲುದಾರರಾಗಬೇಕೇ?"],
  "contact.p4": ["Need technical support?", "ತಾಂತ್ರಿಕ ಬೆಂಬಲ ಬೇಕೇ?"],
  "contact.subject": ["Subject", "ವಿಷಯ"],
  "contact.message": ["Message", "ಸಂದೇಶ"],
  "contact.send": ["Send Message", "ಸಂದೇಶ ಕಳುಹಿಸಿ"],
  "contact.sent": ["Message sent. Our team will get back to you.", "ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ. ನಮ್ಮ ತಂಡ ಸಂಪರ್ಕಿಸುತ್ತದೆ."],
  "contact.call": ["Call", "ಕರೆ"],

  "faq.title": ["QUESTIONS, ANSWERED.", "ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಗಳು."],
  "faq.q1": ["How do I book a machine?", "ಯಂತ್ರವನ್ನು ಹೇಗೆ ಬುಕ್ ಮಾಡುವುದು?"],
  "faq.a1": [
    "Use the Book Your Machine flow, select a machine, share your requirements and details, and you will receive a booking ID.",
    "ಬುಕ್ ಯುವರ್ ಮೆಷಿನ್ ಪ್ರಕ್ರಿಯೆ ಬಳಸಿ ಯಂತ್ರ ಆಯ್ಕೆಮಾಡಿ, ಅಗತ್ಯ ಮತ್ತು ವಿವರ ನೀಡಿ; ನಿಮಗೆ ಬುಕಿಂಗ್ ಐಡಿ ಸಿಗುತ್ತದೆ.",
  ],
  "faq.q2": ["What is the difference between a booking and an order?", "ಬುಕಿಂಗ್ ಮತ್ತು ಆರ್ಡರ್ ನಡುವಿನ ವ್ಯತ್ಯಾಸವೇನು?"],
  "faq.a2": [
    "A booking is a request to purchase or discuss a machine. It becomes an order after quotation and confirmation.",
    "ಬುಕಿಂಗ್ ಎಂದರೆ ಯಂತ್ರ ಖರೀದಿ/ಚರ್ಚೆಗೆ ವಿನಂತಿ. ದರಪಟ್ಟಿ ಮತ್ತು ದೃಢೀಕರಣದ ನಂತರ ಅದು ಆರ್ಡರ್ ಆಗುತ್ತದೆ.",
  ],
  "faq.q3": ["Are prices listed on the website?", "ಬೆಲೆಗಳು ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಇವೆಯೇ?"],
  "faq.a3": [
    "No. Pricing depends on configuration and requirements, so it is confirmed by our team after your booking.",
    "ಇಲ್ಲ. ಬೆಲೆ ಸಂರಚನೆ ಮತ್ತು ಅಗತ್ಯಗಳ ಮೇಲೆ ಅವಲಂಬಿತ; ಬುಕಿಂಗ್ ನಂತರ ನಮ್ಮ ತಂಡ ದೃಢೀಕರಿಸುತ್ತದೆ.",
  ],
  "faq.q4": ["What is the ₹25 contact charge?", "₹25 ಸಂಪರ್ಕ ಶುಲ್ಕ ಎಂದರೇನು?"],
  "faq.a4": [
    "It is a service charge for a direct, secure call session with a team member. Numbers are never exposed publicly.",
    "ಇದು ತಂಡದ ಸದಸ್ಯರೊಂದಿಗೆ ನೇರ, ಸುರಕ್ಷಿತ ಕರೆ ಸೆಷನ್‌ಗಾಗಿ ಸೇವಾ ಶುಲ್ಕ. ಸಂಖ್ಯೆಗಳನ್ನು ಎಂದಿಗೂ ಸಾರ್ವಜನಿಕವಾಗಿ ತೋರಿಸುವುದಿಲ್ಲ.",
  ],

  "footer.rights": ["© 2026 Negilu Machinery. All Rights Reserved.", "© 2026 ನೆಗಿಲು ಮೆಷಿನರಿ. ಎಲ್ಲ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ."],
  "footer.privacy": ["Privacy", "ಗೌಪ್ಯತೆ"],
  "footer.terms": ["Terms", "ನಿಯಮಗಳು"],
  "footer.refund": ["Refund Policy", "ಮರುಪಾವತಿ ನೀತಿ"],
  "footer.language": ["Language", "ಭಾಷೆ"],
  "footer.placeholderContact": [
    "Contact details are placeholders and can be updated by the Negilu team.",
    "ಸಂಪರ್ಕ ವಿವರಗಳು ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್‌ಗಳು; ನೆಗಿಲು ತಂಡ ಇವನ್ನು ನವೀಕರಿಸಬಹುದು.",
  ],
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

const STORAGE_KEY = "negilu.lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "kn" || stored === "en") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l === "kn" ? "kn" : "en";
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = dict[key];
      if (!entry) return key;
      return lang === "kn" ? entry[1] : entry[0];
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}
