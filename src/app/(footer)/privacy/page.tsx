import React from 'react';
import { Shield, User, CreditCard, AlertTriangle, FileText, Scale, Users, Mail, Lock, Eye, Database } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Footer } from '@/components/ui/footer';

const PolicySection = ({ id, title, icon: Icon, children }) => (
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

const InfoCard = ({ title, items }) => (
  <div className="border border-gray-300 p-6 rounded-lg">
    <h4 className="font-semibold text-black mb-3">{title}</h4>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-gray-700">
          <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default function RencodersPrivacyPolicy() {
  return (
    <div className="bg-white text-justify">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed text-justify">
            By using this website, you agree to follow our privacy practices. We are committed to protecting your privacy and ensuring that your personal information is handled securely and responsibly.
          </p>
         
          <Alert className="mt-8 max-w-4xl mx-auto border border-gray-400 bg-gray-100">
            <AlertTriangle className="h-4 w-4 text-black" />
            <AlertDescription className="text-left text-black">
              <strong>Effective Date:</strong> March 1, 2025
            </AlertDescription>
          </Alert>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          <PolicySection
            id="introduction"
            title="Introduction"
            icon={FileText}
          >
            <p className="mb-6">
              Welcome to Renvoice. We are committed to protecting your privacy and ensuring that your personal information is handled securely and responsibly. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our services.
            </p>
            <p className="mb-6">
              By enrolling in our courses or using our platform, you consent to the practices outlined in this Privacy Policy.
            </p>
            <Alert className="border border-gray-400 bg-gray-100">
              <AlertTriangle className="h-4 w-4 text-black" />
              <AlertDescription className="text-black">
                <strong>If you do not agree with our policies and practices, please do not use our services.</strong>
              </AlertDescription>
            </Alert>
          </PolicySection>

          <PolicySection
            id="information-collection"
            title="Information We Collect"
            icon={Database}
          >
            <p className="mb-6">We collect various types of information from students, instructors, and website visitors, including but not limited to:</p>
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard
                title="Personal Information"
                items={[
                  'Full Name',
                  'Email Address',
                  'Phone Number',
                  'Address',
                  'Date of Birth'
                ]}
              />
              <InfoCard
                title="Payment Information"
                items={[
                  'Payment Details',
                  'Transaction Records',
                  'Billing Information',
                  'Payment Method Preferences'
                ]}
              />
            </div>
          </PolicySection>

          <PolicySection
            id="payment-security"
            title="Payment Security & User Responsibilities"
            icon={CreditCard}
          >
            <div className="space-y-6">
              <p>By making payments through our website, you agree to the terms and conditions of our payment gateway partner(s).</p>
             
              <div>
                <h4 className="font-semibold text-black mb-3">Payment Methods</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Credit/Debit Cards', 'Net Banking', 'UPI', 'E-Wallets'].map((method) => (
                    <span key={method} className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm border border-gray-300">
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-black mb-2">Transaction Security</h4>
                  <p className="text-sm text-gray-700">All online transactions are encrypted and secured by SSL/TLS protocols.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Processing Fees</h4>
                  <p className="text-sm text-gray-700">Payment gateway service fees, if applicable, will be displayed during checkout.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Third-Party Services</h4>
                  <p className="text-sm text-gray-700">The Academy is not liable for payment failures, delays, or errors caused by third-party payment gateway providers.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Transaction Records</h4>
                  <p className="text-sm text-gray-700">Students are advised to retain proof of payment for future reference.</p>
                </div>
              </div>
            </div>
          </PolicySection>

          <PolicySection
            id="data-protection"
            title="How We Protect Your Data"
            icon={Shield}
          >
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-black mb-2">Encryption</h4>
                <p>We use industry-standard encryption methods to protect your personal and financial information during transmission and storage.</p>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">Access Control</h4>
                <p>Access to your personal information is restricted to authorized personnel who need it to provide our services.</p>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">Data Retention</h4>
                <p>We retain your information only as long as necessary to provide our services and comply with legal obligations.</p>
              </div>
            </div>
          </PolicySection>

          <PolicySection
            id="refund-policy"
            title="Refund Policy"
            icon={Scale}
          >
            <div className="space-y-4">
              <Alert className="border border-gray-400 bg-gray-100">
                <AlertTriangle className="h-4 w-4 text-black" />
                <AlertDescription>
                  <h4 className="font-semibold text-black mb-2">Non-Refundable Payments</h4>
                  <p className="text-black">
                    Fees once paid are non-refundable, except in cases where Renvoice cancels a course.
                  </p>
                </AlertDescription>
              </Alert>
             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-300 p-4 rounded-lg">
                  <h4 className="font-semibold text-black mb-2">Partial Refunds</h4>
                  <p className="text-sm text-gray-700">If a student withdraws before the course starts, a partial refund may be issued at the Academy's discretion.</p>
                </div>
                <div className="border border-gray-300 p-4 rounded-lg">
                  <h4 className="font-semibold text-black mb-2">No Refund After Commencement</h4>
                  <p className="text-sm text-gray-700">Once the course begins, no refunds will be provided, regardless of attendance.</p>
                </div>
              </div>
             
              <div>
                <h4 className="font-semibold text-black mb-2">Failed Transactions</h4>
                <p>In case of a failed payment transaction, the deducted amount will be automatically reversed by the payment gateway provider within 5-7 business days.</p>
              </div>
            </div>
          </PolicySection>

          <PolicySection
            id="liability"
            title="Limitation of Liability"
            icon={AlertTriangle}
          >
            <div className="space-y-4">
              <p>
                Renvoice uses third-party payment gateways for online transactions. The Academy is not responsible for technical failures, security breaches, or payment errors occurring on the payment gateway provider's platform.
              </p>
              <Alert className="border border-gray-400 bg-gray-100">
                <AlertTriangle className="h-4 w-4 text-black" />
                <AlertDescription className="text-black">
                  In the event of double or failed transactions, students must contact the payment gateway support team directly.
                </AlertDescription>
              </Alert>
            </div>
          </PolicySection>

          <PolicySection
            id="governing-law"
            title="Governing Law"
            icon={Scale}
          >
            <p className="mb-4">
              This Privacy Policy is governed by the laws of India. Any disputes arising shall be resolved through arbitration or legal proceedings within the jurisdiction of Chennai, Tamil Nadu.
            </p>
            <p>
              Students agree to cooperate with the Academy during any dispute resolution process.
            </p>
          </PolicySection>

          <PolicySection
            id="policy-changes"
            title="Changes to This Policy"
            icon={FileText}
          >
            <p>
              We may update this Privacy Policy from time to time. All changes will be posted on this page, and the last updated date will be revised accordingly. We encourage you to review this Privacy Policy periodically for any updates.
            </p>
          </PolicySection>

          {/* Contact Section */}
          
        </div>
      </div>
      <Footer/>
    </div>
  );
}
