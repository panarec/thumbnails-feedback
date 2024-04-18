import { buttonVariants } from '@/components/ui/button';
import { ArrowBigLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  const WEBSITE_NAME = 'Thumbnails Feedback';
  const WEBSITE_ADDRESS = 'https://thumbnailsfeedback.com';
  const EMAIL = 'support@thumbnailsfeedback.com';

  return (
    <div className="p-10">
      <Link href="/" className={buttonVariants()}>
        <ArrowBigLeft className="w-6 h-6" />
        Back to home
      </Link>
      <h1 className="text-2xl my-3">Privacy Policy</h1>
      <p>Effective Date: 24/04/15</p>
      <h2 className="text-lg my-3">Introduction</h2>
      <p className="text-md font-sans font-light">
        Welcome to {WEBSITE_NAME} <strong className="font-bold">(&quot;Website&quot;)</strong> provided by our company
        PALIBATCHEE HOUSE s. r. o., with a registered seat at Klincova 35, 821 08 Bratislava, Slovak Republic,
        registered within the Commercial Register of Municipal Court Bratislava III, Section: Sro, Insert No.: 114327/B{' '}
        <strong className="font-bold">
          (&ldquo;The Company&rdquo;, &ldquo;We&rdquo;, &ldquo;Us&rdquo;, &ldquo;Our&rdquo;)
        </strong>
        . We are committed to protecting the privacy of your data. This Privacy Policy explains how we collect, use,
        protect, and share information and personal data of our users (&ldquo;You&rdquo;). Our processing of your
        personal data is in compliance with the General Data Protection Regulation (GDPR) applicable to data processors
        in the EU.
      </p>
      <p className="text-md font-sans font-light">Contact Details:</p>
      <ul className="font-sans font-light list-disc ml-10">
        <li>Company Name: PALIBATCHEE HOUSE s. r. o.</li>
        <li>Address: Klincova 35, 821 08 Bratislava, Slovak Republic</li>
        <li>Email: {EMAIL}</li>
      </ul>
      <h2 className="text-lg my-3">Data Collection and Types</h2>
      <p className="text-md font-sans font-light">
        We collect personal data that you provide to us when you use our services. This data includes:
      </p>
      <ul className="font-sans font-light list-disc ml-10">
        <li>
          <strong className="font-bold">Personal identification information:</strong> Name, email address, etc.
        </li>
        <li>
          <strong className="font-bold">Usage data:</strong> Information on how you use our website and services.
        </li>
        <li>
          <strong className="font-bold">Technical data:</strong> IP address, browser type and version, time zone
          settings, and operating system.
        </li>
      </ul>
      <p className="text-md font-sans font-light">Data is collected through:</p>
      <ul className="font-sans font-light list-disc ml-10">
        <li>Forms filled out by you on the Website</li>
        <li>Cookies and similar tracking technologies</li>
        <li>Other direct interactions as emails and contact forms</li>
      </ul>
      <h2 className="text-lg my-3">Legal Basis for Processing</h2>
      <p className="text-md font-sans font-light">We process your personal data under the following legal bases:</p>
      <ul className="font-sans font-light list-disc ml-10">
        <li>
          <strong className="font-bold">Consent:</strong> You have given clear consent for us to process your personal
          data for specific purposes.
        </li>
        <li>
          <strong className="font-bold">Contract:</strong> The processing is necessary for a contract you have with us.
        </li>
        <li>
          <strong className="font-bold">Legal obligation:</strong> The processing is necessary for us to comply with the
          law.
        </li>
        <li>
          <strong className="font-bold">Legitimate interests:</strong> The processing is necessary for our legitimate
          interests or the legitimate interests of a third party.
        </li>
      </ul>
      <h2 className="text-lg my-3">Data Use</h2>
      <p className="text-md font-sans font-light">We use your personal data to:</p>
      <ul className="font-sans font-light list-disc ml-10">
        <li>Provide and manage our services.</li>
        <li>Communicate with you, including sending service-related information.</li>
        <li>Improve and personalize our services.</li>
        <li>Comply with legal requirements.</li>
      </ul>
      <h2 className="text-lg my-3">Data Transfer</h2>
      <p className="text-md font-sans font-light">
        Your personal data may be transferred to and stored at a destination outside the European Economic Area (EEA).
        It may also be processed by staff operating outside the EEA who work for us or for one of our suppliers. We will
        take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this
        privacy policy.
      </p>
      <h2 className="text-lg my-3">Data Retention</h2>
      <p className="text-md font-sans font-light">
        We retain personal data only for as long as necessary to fulfill the purposes we collected it for, including for
        the purposes of satisfying any legal, accounting, or reporting requirements. The criteria we use to determine
        retention periods include the length of time we have an ongoing relationship with you and whether there is a
        legal obligation to which we are subject.
      </p>
      <h2 className="text-lg my-3">User Rights</h2>
      <p className="text-md font-sans font-light">Under GDPR, you have the right to:</p>
      <ul className="font-sans font-light list-disc ml-10">
        <li>Access your personal data.</li>
        <li>Correct any mistakes in your data.</li>
        <li>Erase your personal data.</li>
        <li>Object to or restrict processing.</li>
        <li>Data portability.</li>
      </ul>
      <p className="text-md font-sans font-light">To exercise any of these rights, please contact us at {EMAIL}.</p>
      <h2 className="text-lg my-3">Data Security</h2>
      <p className="text-md font-sans font-light">
        We have implemented appropriate security measures to prevent your personal data from being accidentally lost,
        used, altered, disclosed, or accessed without authorization. We also allow access to your personal data only to
        those employees and partners who have a business need to know such data.
      </p>
      <h2 className="text-lg my-3">Use of Cookies and Similar Technologies</h2>
      <p className="text-md font-sans font-light">
        We use cookies and similar tracking technologies to track the activity on our service and hold certain
        information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        However, if you do not accept cookies, you may not be able to use some portions of our service.
      </p>
      <h2 className="text-lg my-3">Amendments to the Privacy Policy</h2>
      <p className="text-md font-sans font-light">
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
        Policy on this page.
      </p>
      <h2 className="text-lg my-3">Contact Information</h2>
      <p className="text-md font-sans font-light">
        For more information about our privacy practices, or if you have questions or concerns, please contact us via
        email at {EMAIL} or by mail at PALIBATCHEE HOUSE s. r. o., with a registered seat at Klincova 35, 821 08
        Bratislava, Slovak Republic.
      </p>
      <h2 className="text-lg my-3">Regulatory Authority</h2>
      <p className="text-md font-sans font-light">
        For any concerns regarding our use of your personal data, you can contact The Office for Personal Data
        Protection of the Slovak Republic at Hraničná 12, 820 07 Bratislava, Slovak Republic.
      </p>
    </div>
  );
}
