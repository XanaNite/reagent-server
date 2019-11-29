BEGIN;

TRUNCATE
  designations_certs
  RESTART IDENTITY CASCADE;

INSERT INTO designations_certs (designation_cert, acronym, description)
VALUES
  (
    'Accredited Buyer’s Representative',
    'ABR®',
    'The Accredited Buyer’s Representative (ABR®) designation is designed for real estate buyer agents who focus on working directly with buyer-clients at every stage of the home buying process.'
  ),
  (
    'Accredited Land Consultants',
    'ALCs',
    'The esteemed Accredited Land Consultants (ALCs) are the most trusted, knowledgeable, experienced, and highest-producing experts in all segments of land. Conferred by the REALTORS® Land Institute, the designation requires successful completion of a rigorous LANDU education program, a specific, high-volume and experience level, and adherence to an honorable Code of Conduct.'
  ),
  (
    'Certified Commercial Investment Member',
    'CCIM',
    'The Certified Commercial Investment Member (CCIM) designation is commercial real estate’s global standard for professional achievement, earned through an extensive curriculum of 200 classroom hours and professional experiential requirements. CCIMs are active in 1,000 U.S. markets and 31 other countries and comprise a 13,000-member network that includes brokers, leasing professionals, asset managers, appraisers, corporate real estate executives, investors, lenders, and other allied professionals.'
  ),
  (
    'Certified International Property Specialist',
    'CIPS',
    'Instantly align yourself with the best in international real estate by earning the CIPS designation. The designation requires completion of five full-day courses focusing on the critical aspects of international real estate transactions. CIPS designees are connected to an influential network of over 3,500 professionals who turn to each other first when looking for referral partners.'
  ),
  (
    'CERTIFIED PROPERTY MANAGER®',
    'CPM®',
    'CPM® designees are recognized as experts in real estate management. Holding this designation demonstrates expertise and integrity to employers, owners, and investors.'
  ),
  (
    'Certified Real Estate Brokerage Manager',
    'CRB',
    'The Certified Real Estate Brokerage Manager (CRB) is one of the most respected and relevant designations offered in real estate business management and is awarded to REALTORS® who have completed advanced educational and professional requirements. CRB Designees are better positioned to streamline operations, integrate new technology and apply new trends and business strategies.'
  ),
  (
    'Certified Residential Specialist',
    'CRS',
    'The CRS designation is the highest credential awarded to residential sales agents, managers, and brokers. On average, CRS designees earn nearly three times more in income, transactions, and gross sales than non-designee REALTORS®.'
  ),
  (
    'Counselor of Real Estate®',
    'CRE®',
    'The Counselors of Real Estate® is an organization of commercial property experts worldwide who provide seasoned, objective advice on real property and land-related matters. Only 1,100 professionals from all disciplines of real estate, academia and government hold the CRE credential. Membership is selective and extended by invitation, although commercial real estate practitioners with 10 years of proven experience may apply.'
  ),
  (
    'General Accredited Appraiser',
    'GAA',
    'For general appraisers, this designation is awarded to those whose education and experience exceed state appraisal certification requirements and is supported by the National Association of REALTORS®.'
  ),
  (
    'NAR’s Green Designation',
    'GREEN',
    'Through NAR’s Green Designation, the Green REsource Council provides ongoing education, resources and tools to help real estate practitioners find, understand, and market properties with green features.'
  ),
  (
    'Graduate REALTOR® Institute',
    'GRI',
    'REALTORS® with the GRI designation have in-depth training in legal and regulatory issues, technology, professional standards, and the sales process. Earning the designation is a way to stand out to prospective buyers and sellers as a professional with expertise in these areas.'
  ),
  (
    'Performance Management Network',
    'PMN',
    'This designation is unique to the REALTOR® family designations, emphasizing that in order to enhance your business, you must enhance yourself. It focuses on negotiating strategies and tactics, networking and referrals, business planning and systems, personal performance management and  leadership development.'
  (
    'REALTOR® Association Certified Executive',
    'RCE',
    'RCE is the only professional designation designed specifically for REALTOR® association executives. RCE designees exemplify goal-oriented AEs with drive, experience and commitment to professional growth.'
  ),
  (
    'Residential Accredited Appraiser',
    'RAA',
    'For residential appraisers, this designation is awarded to those whose education and experience exceed state appraisal certification requirements and is supported by the National Association of REALTORS®.'
  ),
  (
    'Seller Representative Specialist',
    'SRS',
    'The Seller Representative Specialist (SRS) designation is the premier credential in seller representation. It is designed to elevate professional standards and enhance personal performance. The designation is awarded to real estate professionals who demonstrate the knowledge and skills essential for seller advocacy. SRS designees represent a global community of REALTORS® who use their advanced training and expertise to go above and beyond their client’s expectations.'
  ),
  (
    'Society of Industrial and Office REALTORS®',
    'SIOR',
    'The SIOR designation is held by only the most knowledgeable, experienced, and successful commercial real estate brokerage specialists. To earn it, designees must meet standards of experience, production, education, ethics, and provide recommendations.'
  ),
  (
    'Seniors Real Estate Specialist®',
    'SRES®',
    'The SRES® Designation program educates REALTORS® on how to profitably and ethically serve the real estate needs of the fastest growing market in real estate, clients age 50+. By earning the SRES® designation, you gain access to valuable member benefits, useful resources, and networking opportunities across the U.S. and Canada to help you in your business.'
  ),
  (
    'At Home With Diversity',
    'AHWD',
    'Learn to work effectively with – and within – today’s diverse real estate market. The At Home With Diversity certification teaches you how to conduct your business with sensitivity to all client profiles and build a business plan to successfully serve them.'
  ),
  (
    'Broker Price Opinion Resource',
    'BPOR',
    'The BPOR certification is no longer being awarded to members. Approximately 6,000 members have earned BPOR.'
  ),
  (
    'Certified Real Estate Team Specialist',
    'C-RETS',
    'The Certified Real Estate Team Specialist (C-RETS) certification is designed to improve team development, individual leadership skills, and financial performance. C-RETS courses provide the tools, strategies, and knowledge that are required of today’s real estate professionals who are either considering or currently operating in a team environment. It is for team leaders, team members, those looking to start a team, and those who simply want to sharpen their management skills.'
  ),
  (
    'Digital Marketing: Social Media',
    NULL,
    'The RRC Digital Marketing: Social Media certification is for real estate professionals who want to develop expertise with social media resources and the sites that are an essential part of today’s digital marketing mix, whether you are promoting your business or the properties you represent.'
  ),
  (
    'e-PRO®',
    NULL,
    'NAR’s e-PRO® certification program helps REALTORS® master the advanced digital marketing techniques of today. With the e-PRO® certification, REALTORS® increase their ability to reach customers, expand their capabilities, and build trust by safeguarding client information.'
  (
    'Military Relocation Professional',
    'MRP',
    'NAR’s Military Relocation Professional certification focuses on educating real estate professionals about working with current and former military service members to find housing solutions that best suit their needs and take full advantage of military benefits and support.'
  ),
  (
    'Pricing Strategy Advisor',
    'PSA',
    'Enhance your skills in pricing properties, creating CMAs, working with appraisers, and guiding clients through the anxieties and misperceptions they often have about home values with NAR’s PSA (Pricing Strategy Advisor) certification.'
  ),
  (
    'Real Estate Negotiation Expert',
    'RENE',
    'The first and only negotiation credential recognized by the National Association of REALTORS®, the Real Estate Negotiation Expert (RENE) certification is designed to elevate and enhance negotiating skills so that today’s real estate professionals can play the game to win.'
  ),
  (
    'Residential Listing',
    NULL,
    'The RRC Residential Listing Specialist Certification program helps REALTORS® master the art of listing residential properties. The courses provide strategies, tools, and more to help agents enhance and differentiate their listings.'
  ),
  (
    'Resort & Second-Home Property Specialist',
    'RSPS',
    'This certification is designed for REALTORS® who facilitate the buying, selling, or management of properties for investment, development, retirement, or second homes in a resort, recreational and/or vacation destination are involved in this market niche.'
  ),
  (
  'Short Sales & Foreclosure Resource®',
  'SFR®',
  'The SFR® certification  teaches real estate professionals to work with distressed sellers and the finance, tax, and legal professionals who can help them, qualify sellers for short sales, develop a short sale package, negotiate with lenders, safeguard your commission, limit risk, and protect buyers.'
  ), 
  (
  'Smart Home',
  NULL,
  'The Smart Home certification is for real estate professionals who want to develop expertise in the technology, privacy issues, and best transition tactics involved in selling smart homes.'
  );

COMMIT;