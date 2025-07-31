import React from 'react';
import { Shield, Phone, Bot, AlertTriangle, FileText, Scale, Users, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Footer } from '@/components/ui/footer';


const TermsSection = ({ id, title, icon: Icon, children }) => (
  <section id={id} className="mb-12">
    <div className="flex items-center gap-3 mb-6">
      <Icon className="w-6 h-6 text-black" />
      <h2 className="text-2xl font-semibold text-black">{title}</h2>
    </div>
    <div className="prose prose-gray max-w-none text-gray-800 leading-relaxed">
      {children}
    </div>
  </section>
);

const ServiceCard = ({ title, description }) => (
  <div className="border border-gray-300 p-6 rounded-lg">
    <h4 className="font-semibold text-black mb-2">{title}</h4>
    <p className="text-sm text-gray-700">{description}</p>
  </div>
);

export default function RenvoiceTerms() {
  return (
    <div className="bg-white text-justify">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-6">Terms & Conditions</h1>
        <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed text-justify">
            Welcome to Renvoice AI-powered phone services. By using our platform, you agree to these terms which govern our virtual phone numbers, AI agents, and automated phone interactions.
          </p>
         
          
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          <TermsSection
            id="overview"
            title="Overview"
            icon={FileText}
          >
            <p className="mb-6">
              Renvoice is an Indian company providing AI-powered phone services. These terms create a legally binding agreement between you and us regarding your use of our services.
            </p>
            <Alert className="border border-gray-400 bg-gray-100">
              <AlertTriangle className="h-4 w-4 text-black" />
              <AlertDescription className="text-black">
                <strong>If you do not agree with all terms, you must discontinue use immediately.</strong>
              </AlertDescription>
            </Alert>
          </TermsSection>

          <TermsSection
            id="services"
            title="Our Services"
            icon={Bot}
          >
            <p className="mb-6">We provide AI-powered phone services including:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ServiceCard
                title="Virtual Phone Numbers"
                description="AI agent-enabled phone numbers for business and personal use"
              />
              <ServiceCard
                title="AI Assistants"
                description="Personal assistant services via phone calls"
              />
              <ServiceCard
                title="Appointment Booking"
                description="Automated scheduling and booking services"
              />
              <ServiceCard
                title="Customer Service"
                description="AI-powered customer support automation"
              />
            </div>
            <Alert className="border border-gray-400 bg-gray-100">
              <AlertTriangle className="h-4 w-4 text-black" />
              <AlertDescription className="text-black">
                <strong>Note:</strong> Our services are not HIPAA or healthcare compliant. AI responses may not always be accurate and should not be relied upon for critical decisions.
              </AlertDescription>
            </Alert>
          </TermsSection>

          <TermsSection
            id="usage"
            title="Usage Guidelines"
            icon={Users}
          >
            <div className="mb-6">
              <h4 className="font-semibold text-black mb-4">You agree to:</h4>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  Provide accurate registration information
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  Comply with telecommunications laws
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  Obtain necessary call recording consents
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  Use services for legitimate purposes only
                </li>
              </ul>
            </div>
            <Alert className="border border-gray-400 bg-gray-100">
              <AlertTriangle className="h-4 w-4 text-black" />
              <AlertDescription>
                <h4 className="font-semibold text-black mb-2">Prohibited Activities:</h4>
                <ul className="space-y-1 text-black">
                  <li>• Spam calling or unsolicited telemarketing</li>
                  <li>• Harassment or abusive communications</li>
                  <li>• Fraudulent activities or scams</li>
                  <li>• Using for emergency services</li>
                  <li>• Reverse engineering our AI technology</li>
                </ul>
              </AlertDescription>
            </Alert>
          </TermsSection>

          <TermsSection
            id="phone-terms"
            title="Phone Service Terms"
            icon={Phone}
          >
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-black mb-2">Number Ownership</h4>
                <p>Phone numbers remain our property. You have usage rights during active subscription.</p>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">Call Quality</h4>
                <p>We strive for high quality but cannot guarantee 100% uptime or call completion rates.</p>
              </div>
              <Alert className="border border-gray-400 bg-gray-100">
                <AlertTriangle className="h-4 w-4 text-black" />
                <AlertDescription>
                  <h4 className="font-semibold text-black mb-2">⚠️ Emergency Services Warning</h4>
                  <p className="text-black font-medium">
                    Do NOT use our service for emergency communications. Always use traditional phone services for police, fire, or medical emergencies.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          </TermsSection>

          <TermsSection
            id="privacy"
            title="Privacy & Data Protection"
            icon={Shield}
          >
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-black mb-2">Call Recording</h4>
                <p>Calls may be recorded for quality assurance and AI training. You're responsible for obtaining necessary consents per local laws.</p>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">Data Processing</h4>
                <p>We process call data for AI services including speech recognition and natural language processing, as detailed in our Privacy Policy.</p>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">Data Storage</h4>
                <p>Call recordings are stored securely with retention periods varying by plan and legal requirements.</p>
              </div>
            </div>
          </TermsSection>

          <TermsSection
            id="payments"
            title="Payments & Subscriptions"
            icon={Scale}
          >
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-black mb-4">Accepted Payment Methods</h4>
                <div className="flex flex-wrap gap-2">
                  {['Credit/Debit Cards', 'UPI', 'Net Banking', 'Digital Wallets', 'Razorpay', 'Cashfree'].map((method) => (
                    <span key={method} className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm border border-gray-300">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">Subscription Terms</h4>
                <p className="mb-2">All payments in Indian Rupees (INR). Subscriptions auto-renew unless cancelled.</p>
                <p>Free trials available for new users. Cancel anytime - takes effect at end of current term.</p>
              </div>
            </div>
          </TermsSection>

          

          
          
        </div>
      </div>
      <Footer />
    </div>
  );
}
