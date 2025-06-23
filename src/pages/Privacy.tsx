
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Data Controller</h2>
              <p className="mb-3">
                The data controller responsible for your personal data is:
              </p>
              <div className="ml-4">
                <p className="font-semibold">Christian Bernhard</p>
                <p>Hitzhofener Straße 5b</p>
                <p>85080 Gaimersheim, Germany</p>
                <p>Email: info[at]weightvs.com</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">2. Data We Collect</h2>
              <h3 className="font-semibold mb-2">2.1 Information You Provide</h3>
              <ul className="list-disc ml-6 mb-4 space-y-1">
                <li>Weight measurements you enter for comparison purposes</li>
                <li>Custom objects you create for weight comparisons</li>
                <li>Contact information when using our contact form (future feature)</li>
              </ul>
              
              <h3 className="font-semibold mb-2">2.2 Information Automatically Collected</h3>
              <ul className="list-disc ml-6 mb-4 space-y-1">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Website usage data via Google Analytics (when implemented)</li>
                <li>IP address (anonymized)</li>
                <li>Date and time of visits</li>
                <li>Pages visited on our website</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">3. Legal Basis for Processing</h2>
              <p className="mb-3">We process your personal data based on:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Legitimate Interest (Art. 6(1)(f) GDPR):</strong> For website analytics and improving user experience</li>
                <li><strong>Consent (Art. 6(1)(a) GDPR):</strong> For cookies and tracking technologies</li>
                <li><strong>Contract Performance (Art. 6(1)(b) GDPR):</strong> For providing our weight comparison service</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">4. How We Use Your Data</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>To provide weight comparison functionality</li>
                <li>To improve our website and user experience</li>
                <li>To analyze website usage patterns (via Google Analytics)</li>
                <li>To respond to contact inquiries (future feature)</li>
                <li>To ensure website security and prevent abuse</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">5. Data Sharing</h2>
              <p className="mb-3">We may share your data with:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Google Analytics:</strong> For website usage analysis (anonymized data)</li>
                <li><strong>Social Media Platforms:</strong> When you use sharing features (data is shared directly by your browser)</li>
              </ul>
              <p className="mt-3">We do not sell, rent, or otherwise commercially distribute your personal data to third parties.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">6. Data Retention</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Weight and comparison data:</strong> Stored locally in your browser, deleted when you clear browser data</li>
                <li><strong>Analytics data:</strong> Retained for 12 months, then automatically deleted</li>
                <li><strong>Contact form submissions:</strong> Retained for 12 months for customer service purposes</li>
                <li><strong>Cookie consent:</strong> Retained for 12 months</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">7. Your Rights Under GDPR</h2>
              <p className="mb-3">You have the following rights regarding your personal data:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Right of Access:</strong> Request information about what personal data we process</li>
                <li><strong>Right of Rectification:</strong> Request correction of inaccurate personal data</li>
                <li><strong>Right of Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
              </ul>
              <p className="mt-3">To exercise these rights, contact us at info[at]weightvs.com</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">8. Cookies and Tracking</h2>
              <p className="mb-3">We use cookies and similar technologies to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Improve website functionality</li>
              </ul>
              <p className="mt-3">You can manage your cookie preferences through our cookie consent banner or your browser settings.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">9. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">10. International Data Transfers</h2>
              <p>Some of our service providers (like Google Analytics) may process data outside the European Economic Area. We ensure such transfers comply with GDPR requirements through appropriate safeguards.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">11. Children's Privacy</h2>
              <p>Our website is not intended for children under 16 years of age. We do not knowingly collect personal data from children under 16.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">12. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated revision date.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">13. Contact Information</h2>
              <p className="mb-3">For any questions about this privacy policy or our data practices, contact us at:</p>
              <div className="ml-4">
                <p>Email: info[at]weightvs.com</p>
                <p>Address: Hitzhofener Straße 5b, 85080 Gaimersheim, Germany</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">14. Supervisory Authority</h2>
              <p>You have the right to lodge a complaint with a supervisory authority if you believe our processing of your personal data violates GDPR. The competent authority for Bavaria, Germany is the Bayerisches Landesamt für Datenschutzaufsicht.</p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Last updated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                This Privacy Policy complies with the EU General Data Protection Regulation (GDPR) and German data protection laws.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
