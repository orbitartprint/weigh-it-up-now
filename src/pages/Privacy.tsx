
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer"
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Privacy = () => {
  const navigate = useNavigate();
  useEffect(() => {window.scrollTo(0, 0);}, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Button>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-black">PRIVACY POLICY</h1>
              <p className="font-bold mb-4">Last updated June 24, 2025</p>
            </div>

            <div>
              <p className="mb-4">
                This Privacy Notice for WeightVs.com ("
                <strong>we</strong>
                ," "
                <strong>us</strong>
                ," or "
                <strong>our</strong>
                "), describes how and why we might access, collect, store, use, and/or share ("
                <strong>process</strong>
                ") your personal information when you use our services ("
                <strong>Services</strong>
                "), including when you:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-1">
                <li>
                  Visit our website at{" "}
                  <a href="https://www.weightvs.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    https://www.weightvs.com
                  </a>{" "}
                  or any website of ours that links to this Privacy Notice
                </li>
                <li>Engage with us in other related ways, including any sales, marketing, or events</li>
              </ul>
              <p className="mb-4">
                <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">SUMMARY OF KEY POINTS</h2>
              <p className="mb-4">
                <strong>
                  <em>
                    This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our{" "}
                    <a href="#toc" className="text-blue-600 underline">table of contents</a> below to find the section you are looking for.
                  </em>
                </strong>
              </p>
              
              <div className="space-y-3">
                <p>
                  <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about{" "}
                  <a href="#personalinfo" className="text-blue-600 underline">personal information you disclose to us</a>.
                </p>
                
                <p>
                  <strong>Do we process any sensitive personal information?</strong> Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.
                </p>
                
                <p>
                  <strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.
                </p>
                
                <p>
                  <strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about{" "}
                  <a href="#infouse" className="text-blue-600 underline">how we process your information</a>.
                </p>
                
                <p>
                  <strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties. Learn more about{" "}
                  <a href="#whoshare" className="text-blue-600 underline">when and with whom we share your personal information</a>.
                </p>
                
                <p>
                  <strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about{" "}
                  <a href="#privacyrights" className="text-blue-600 underline">your privacy rights</a>.
                </p>
                
                <p>
                  <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a{" "}
                  <a href="https://app.termly.io/notify/f69196c9-12f7-47d9-ac5f-6417f99de468" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    data subject access request
                  </a>, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
                </p>
                
                <p>
                  Want to learn more about what we do with any information we collect?{" "}
                  <a href="#toc" className="text-blue-600 underline">Review the Privacy Notice in full</a>.
                </p>
              </div>
            </div>

            <div id="toc">
              <h2 className="text-xl font-bold mb-3 text-black">TABLE OF CONTENTS</h2>
              <div className="space-y-1">
                <div><a href="#infocollect" className="text-blue-600 underline">1. WHAT INFORMATION DO WE COLLECT?</a></div>
                <div><a href="#infouse" className="text-blue-600 underline">2. HOW DO WE PROCESS YOUR INFORMATION?</a></div>
                <div><a href="#legalbases" className="text-blue-600 underline">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></div>
                <div><a href="#whoshare" className="text-blue-600 underline">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></div>
                <div><a href="#cookies" className="text-blue-600 underline">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></div>
                <div><a href="#inforetain" className="text-blue-600 underline">6. HOW LONG DO WE KEEP YOUR INFORMATION?</a></div>
                <div><a href="#infominors" className="text-blue-600 underline">7. DO WE COLLECT INFORMATION FROM MINORS?</a></div>
                <div><a href="#privacyrights" className="text-blue-600 underline">8. WHAT ARE YOUR PRIVACY RIGHTS?</a></div>
                <div><a href="#DNT" className="text-blue-600 underline">9. CONTROLS FOR DO-NOT-TRACK FEATURES</a></div>
                <div><a href="#uslaws" className="text-blue-600 underline">10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></div>
                <div><a href="#policyupdates" className="text-blue-600 underline">11. DO WE MAKE UPDATES TO THIS NOTICE?</a></div>
                <div><a href="#contact" className="text-blue-600 underline">12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></div>
                <div><a href="#request" className="text-blue-600 underline">13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></div>
                <div><a href="#SSL" className="text-blue-600 underline">14. SSL/TLS ENCRYPTION</a></div>
              </div>
            </div>

            <div id="infocollect">
              <h2 className="text-xl font-bold mb-3 text-black">1. WHAT INFORMATION DO WE COLLECT?</h2>
              
              <h3 className="text-lg font-bold mb-2 text-black" id="personalinfo">Personal information you disclose to us</h3>
              <p className="mb-2">
                <strong><em>In Short:</em></strong> <em>We collect personal information that you provide to us.</em>
              </p>
              <p className="mb-4">
                We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
              </p>
              
              <p className="mb-2"><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
              <ul className="list-disc ml-6 mb-4 space-y-1">
                <li>weight measurements you enter for comparison purposes</li>
                <li>custom objects you create for weight comparisons</li>
                <li>contact or authentication data</li>
              </ul>
              
              <p className="mb-4">
                <strong>Sensitive Information.</strong> We do not process sensitive information.
              </p>
              <p className="mb-4">
                All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
              </p>

              <h3 className="text-lg font-bold mb-2 text-black">Information automatically collected</h3>
              <p className="mb-2">
                <strong><em>In Short:</em></strong> <em>Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</em>
              </p>
              <p className="mb-4">
                We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
              </p>
              <p className="mb-4">Like many businesses, we also collect information through cookies and similar technologies.</p>
              <p className="mb-2">The information we collect includes:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>
                  <em>Log and Usage Data.</em> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).
                </li>
                <li>
                  <em>Device Data.</em> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.
                </li>
                <li>
                  <em>Location Data.</em> We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.
                </li>
              </ul>
            </div>

            <div id="infouse">
              <h2 className="text-xl font-bold mb-3 text-black">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
              <p className="mb-4">
                <strong><em>In Short:</em></strong> <em>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We process the personal information for the following purposes listed below. We may also process your information for other purposes only with your prior explicit consent.</em>
              </p>
              <p className="mb-2"><strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong></p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>To save or protect an individual's vital interest.</strong> We may process your information when necessary to save or protect an individual's vital interest, such as to prevent harm.</li>
              </ul>
            </div>

            <div id="legalbases">
              <h2 className="text-xl font-bold mb-3 text-black">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
              <p className="mb-2">
                <em><strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</em>
              </p>
              
              <p className="mb-2"><em><strong><u>If you are located in the EU or UK, this section applies to you.</u></strong></em></p>
              <p className="mb-2">The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</p>
              <ul className="list-disc ml-6 mb-4 space-y-1">
                <li>
                  <strong>Consent.</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time. Learn more about{" "}
                  <a href="#withdrawconsent" className="text-blue-600 underline">withdrawing your consent</a>.
                </li>
                <li>
                  <strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.
                </li>
                <li>
                  <strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.
                </li>
              </ul>

              <p className="mb-2"><strong><u><em>If you are located in Canada, this section applies to you.</em></u></strong></p>
              <p className="mb-4">
                We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can{" "}
                <a href="#withdrawconsent" className="text-blue-600 underline">withdraw your consent</a> at any time.
              </p>
              <p className="mb-2">In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>
              <ul className="list-disc ml-6 mb-4 space-y-1">
                <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
                <li>For investigations and fraud detection and prevention</li>
                <li>For business transactions provided certain conditions are met</li>
                <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
                <li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
                <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
                <li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
                <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
                <li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
                <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
                <li>If the information is publicly available and is specified by the regulations</li>
                <li>We may disclose de-identified information for approved research or statistics projects, subject to ethics oversight and confidentiality commitments</li>
              </ul>
            </div>

            <div id="whoshare">
              <h2 className="text-xl font-bold mb-3 text-black">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
              <p className="mb-4">
                <strong><em>In Short:</em></strong> <em>We may share information in specific situations described in this section and/or with the following third parties.</em>
              </p>
              <p className="mb-2">We may need to share your personal information in the following situations:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>
                  <strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                </li>
              </ul>
            </div>

            <div id="cookies">
              <h2 className="text-xl font-bold mb-3 text-black">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
              <p className="mb-4">
                <strong><em>In Short:</em></strong> <em>We may use cookies and other tracking technologies to collect and store your information.</em>
              </p>
              <p className="mb-4">
                We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
              </p>
              <p className="mb-4">
                We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
              </p>
              <p className="mb-4">
                To the extent these online tracking technologies are deemed to be a "sale"/"sharing" (which includes targeted advertising, as defined under the applicable laws) under applicable US state laws, you can opt out of these online tracking technologies by submitting a request as described below under section "{" "}
                <a href="#uslaws" className="text-blue-600 underline">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a>"
              </p>
              <p className="mb-4">Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>

              <h3 className="text-lg font-bold mb-2 text-black">5.1 GOOGLE ANALYTICS</h3>
              <p className="mb-4">
                We use Google Analytics to understand how our website is used and to improve its functionality. Google Analytics collects data about your Browse activity, including the pages you visit, the links you click, and your IP address (which is anonymized). This data is used to generate reports on website traffic and user behavior. Google Analytics uses cookies to collect this data. You can manage your cookie preferences and opt-out of personalized advertising through Google's Ad Settings. For more information on how Google Analytics handles data, please refer to Google's{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="https://business.safety.google/adsservices/processorterms/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Google Analytics's Data Processing Terms
                </a>.
              </p>

              <h3 className="text-lg font-bold mb-2 text-black">5.2 GOOGLE ADSENSE</h3>
              <p className="mb-4">
                We use Google AdSense to display advertising on our website. Google and its partners use cookies to serve ads based on your prior visits to our website and other websites. You can opt out of personalized advertising by visiting Google's{" "}
                <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Ad Settings
                </a>. We also use cookies and device identifiers to personalize your experience and analyze ad performance. You can manage your cookie preferences on our site or through your browser settings. We are committed to protecting your privacy and comply with all relevant data privacy laws.
              </p>
            </div>

            <div id="inforetain">
              <h2 className="text-xl font-bold mb-3 text-black">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
              <p className="mb-4">
                <strong><em>In Short:</em></strong> <em>We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</em>
              </p>
              <p className="mb-4">
                We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
              </p>
              <p className="mb-4">
                When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
              </p>
            </div>

            <div id="infominors">
              <h2 className="text-xl font-bold mb-3 text-black">7. DO WE COLLECT INFORMATION FROM MINORS?</h2>
              <p className="mb-4">
                <strong><em>In Short:</em></strong> <em>We do not knowingly collect data from or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction.</em>
              </p>
              <p className="mb-4">
                We do not knowingly collect, solicit data from, or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or the equivalent age as specified by law in your jurisdiction or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age or the equivalent age as specified by law in your jurisdiction has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18 or the equivalent age as specified by law in your jurisdiction, please contact us at info[at]weightvs.com.
              </p>
            </div>

            <div id="privacyrights">
              <h2 className="text-xl font-bold mb-3 text-black">8. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
              <p className="mb-4">
                <strong><em>In Short:</em></strong> <em>Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</em>
              </p>
              <p className="mb-4">
                In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making. If a decision that produces legal or similarly significant effects is made solely by automated means, we will inform you, explain the main factors, and offer a simple way to request human review. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section "{" "}
                <a href="#contact" className="text-blue-600 underline">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>" below.
              </p>
              <p className="mb-4">
                We will consider and act upon any request in accordance with applicable data protection laws. If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your{" "}
                <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Member State data protection authority
                </a>{" "}
                or{" "}
                <a href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  UK data protection authority
                </a>.
              </p>
              <p className="mb-4">
                If you are located in Switzerland, you may contact the{" "}
                <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Federal Data Protection and Information Commissioner
                </a>.
              </p>
              
              <p className="mb-4" id="withdrawconsent">
                <strong><u>Withdrawing your consent:</u></strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "{" "}
                <a href="#contact" className="text-blue-600 underline">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>" below.
              </p>
              <p className="mb-4">
                However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
              </p>
            </div>

            <div id="DNT">
              <h2 className="text-xl font-bold mb-3 text-black">9. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
              <p className="mb-4">
                Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
              </p>
              <p className="mb-4">
                California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.
              </p>
            </div>

            <div id="uslaws">
              <h2 className="text-xl font-bold mb-3 text-black">10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
              <p className="mb-4">
                <strong><em>In Short:</em></strong> <em>If you are a resident of, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. More information is provided below.</em>
              </p>

              <h3 className="text-lg font-bold mb-2 text-black">Categories of Personal Information We Collect</h3>
              <p className="mb-4">
                The table below shows the categories of personal information we have collected in the past twelve (12) months. The table includes illustrative examples of each category and does not reflect the personal information we collect from you. For a comprehensive inventory of all personal information we process, please refer to the section "{" "}
                <a href="#infocollect" className="text-blue-600 underline">WHAT INFORMATION DO WE COLLECT?</a>"
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-left"><strong>Category</strong></th>
                      <th className="border border-gray-300 p-2 text-left"><strong>Examples</strong></th>
                      <th className="border border-gray-300 p-2 text-left"><strong>Collected</strong></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">A. Identifiers</td>
                      <td className="border border-gray-300 p-2">Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
                      <td className="border border-gray-300 p-2 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">B. Protected classification characteristics under state or federal law</td>
                      <td className="border border-gray-300 p-2">Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data</td>
                      <td className="border border-gray-300 p-2 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">C. Commercial information</td>
                      <td className="border border-gray-300 p-2">Transaction information, purchase history, financial details, and payment information</td>
                      <td className="border border-gray-300 p-2 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">D. Biometric information</td>
                      <td className="border border-gray-300 p-2">Fingerprints and voiceprints</td>
                      <td className="border border-gray-300 p-2 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">E. Internet or other similar network activity</td>
                      <td className="border border-gray-300 p-2">Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements</td>
                      <td className="border border-gray-300 p-2 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">F. Geolocation data</td>
                      <td className="border border-gray-300 p-2">Device location</td>
                      <td className="border border-gray-300 p-2 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">G. Audio, electronic, sensory, or similar information</td>
                      <td className="border border-gray-300 p-2">Images and audio, video or call recordings created in connection with our business activities</td>
                      <td className="border border-gray-300 p-2 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">H. Professional or employment-related information</td>
                      <td className="border border-gray-300 p-2">Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us</td>
                      <td className="border border-gray-300 p-2 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">I. Education Information</td>
                      <td className="border border-gray-300 p-2">Student records and directory information</td>
                      <td className="border border-gray-300 p-2 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">J. Inferences drawn from collected personal information</td>
                      <td className="border border-gray-300 p-2">Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual's preferences and characteristics</td>
                      <td className="border border-gray-300 p-2 text-center">NO</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">K. Sensitive personal Information</td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2 text-center">NO</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mb-2">We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:</p>
              <ul className="list-disc ml-6 mb-4 space-y-1">
                <li>Receiving help through our customer support channels;</li>
                <li>Participation in customer surveys or contests; and</li>
                <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
              </ul>

              <h3 className="text-lg font-bold mb-2 text-black">Sources of Personal Information</h3>
              <p className="mb-4">
                Learn more about the sources of personal information we collect in "{" "}
                <a href="#infocollect" className="text-blue-600 underline">WHAT INFORMATION DO WE COLLECT?</a>"
              </p>

              <h3 className="text-lg font-bold mb-2 text-black">How We Use and Share Personal Information</h3>
              <p className="mb-4">
                Learn more about how we use your personal information in the section, "{" "}
                <a href="#infouse" className="text-blue-600 underline">HOW DO WE PROCESS YOUR INFORMATION?</a>"
              </p>
              <p className="mb-4">
                <strong>Will your information be shared with anyone else?</strong>
              </p>
              <p className="mb-4">
                We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Learn more about how we disclose personal information to in the section, "{" "}
                <a href="#whoshare" className="text-blue-600 underline">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a>"
              </p>
              <p className="mb-4">
                We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal information.
              </p>
              <p className="mb-4">
                We have not disclosed, sold, or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. We will not sell or share personal information in the future belonging to website visitors, users, and other consumers.
              </p>

              <h3 className="text-lg font-bold mb-2 text-black">Your Rights</h3>
              <p className="mb-2">You have rights under certain US state data protection laws. However, these rights are not absolute, and in certain cases, we may decline your request as permitted by law. These rights include:</p>
              <ul className="list-disc ml-6 mb-4 space-y-1">
                <li><strong>Right to know</strong> whether or not we are processing your personal data</li>
                <li><strong>Right to access</strong> your personal data</li>
                <li><strong>Right to correct</strong> inaccuracies in your personal data</li>
                <li><strong>Right to request</strong> the deletion of your personal data</li>
                <li><strong>Right to obtain a copy</strong> of the personal data you previously shared with us</li>
                <li><strong>Right to non-discrimination</strong> for exercising your rights</li>
                <li><strong>Right to opt out</strong> of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects ("profiling")</li>
              </ul>

              <h3 className="text-lg font-bold mb-2 text-black">How to Exercise Your Rights</h3>
              <p className="mb-4">
                To exercise these rights, you can contact us by submitting our{" "}
                <a href="https://www.weightvs.com/contact" target="_blank" className="text-blue-600 underline">
                  contact formular
                </a>, by emailing us at info[at]weightvs.com, or by referring to the contact details at the bottom of this document.
              </p>
              <p className="mb-4">
                Under certain US state data protection laws, you can designate an authorized agent to make a request on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with applicable laws.
              </p>

              <h3 className="text-lg font-bold mb-2 text-black">Request Verification</h3>
              <p className="mb-4">
                Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. We will only use personal information provided in your request to verify your identity or authority to make the request. However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes.
              </p>
              <p className="mb-4">
                If you submit the request through an authorized agent, we may need to collect additional information to verify your identity before processing your request and the agent will need to provide a written and signed permission from you to submit such request on your behalf.
              </p>
            </div>

            <div id="policyupdates">
              <h2 className="text-xl font-bold mb-3 text-black">11. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
              <p className="mb-4">
                <em><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</em>
              </p>
              <p className="mb-4">
                We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
              </p>
            </div>

            <div id="contact">
              <h2 className="text-xl font-bold mb-3 text-black">12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
              <p className="mb-4">
                If you have questions or comments about this notice, you may email us at info[at]weightvs.com
              </p>
            </div>

            <div id="request">
              <h2 className="text-xl font-bold mb-3 text-black">13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
              <p className="mb-4">
                Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please fill out and submit our{" "}
                <a href="https://www.weightvs.com/contact" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  contact formular
                </a>.
              </p>
            </div>

            <div id="SSL">
              <h2 className="text-xl font-bold mb-3 text-black">14. SSL/TLS ENCRYPTION</h2>
              <p className="mb-4">
                This site uses SSL/TLS encryption for security reasons and to protect the transmission of confidential content, such as orders or inquiries you send to us as the site operator. You can recognize an encrypted connection by the change in the browser's address line from "http://" to "https://" and by the lock symbol in your browser bar. When SSL/TLS encryption is activated, the data you transmit to us cannot be read by third parties.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Last updated: June 24, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
