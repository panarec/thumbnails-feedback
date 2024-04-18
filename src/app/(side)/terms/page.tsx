import { buttonVariants } from '@/components/ui/button';
import { ArrowBigLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
};

export default function TermsPage() {
  const WEBSITE_NAME = 'Thumbnails Feedback';
  const WEBSITE_ADDRESS = 'https://thumbnailsfeedback.com';

  return (
    <div className="p-10">
      <Link href="/" className={buttonVariants()}>
        <ArrowBigLeft className="w-6 h-6" />
        Back to home
      </Link>
      <h1 className="text-3xl my-3">Terms and Conditions</h1>
      <p>Effective Date: 24/04/15</p>
      <p className="text-md font-sans font-light">
        Welcome to {WEBSITE_NAME}! These Terms and Conditions outline the rules and regulations for the use of{' '}
        {WEBSITE_NAME}, located at {WEBSITE_ADDRESS}. By accessing this website, we assume you accept these terms and
        conditions in full. Do not continue to use {WEBSITE_NAME} if you do not agree to all of the terms and conditions
        stated on this page.
      </p>
      <h2 className="text-lg my-3">
        1. The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice, and
        any or all Agreements:
      </h2>
      <ul className="font-sans font-light list-disc ml-10">
        <li>
          <strong className="font-bold">&quot;Client&quot;, &quot;You&quot; and &quot;Your&quot;</strong> refers to you,
          the person accessing this Website and accepting the company&apos;s terms and conditions.
        </li>
        <li>
          <strong className="font-bold">
            &quot;The Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;
          </strong>{' '}
          refers to our company PALIBATCHEE HOUSE s. r. o., with a registered seat at Klincova 35, 821 08 Bratislava,
          Slovak Republic, registered within the Commercial Register of Municipal Court Bratislava III.
        </li>
        <li>
          <strong className="font-bold">&quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;</strong> refers to
          both the Client and ourselves, or either the Client or ourselves.
        </li>
        <li>
          <strong className="font-bold">&ldquo;Website&rdquo;</strong> refers to this website {WEBSITE_ADDRESS}.
        </li>
      </ul>
      <h2 className="text-lg my-3">2. Use of the Website</h2>
      <p className="text-md font-sans font-light">
        On accessing this website, you warrant and represent to Us that you are legally entitled to do so and to make
        use of information made available via the website.
      </p>
      <h2 className="text-lg my-3">3. Intellectual Property Rights</h2>
      <p className="text-md font-sans font-light">
        Other than content you own, which you may have opted to include on this Website, under these Terms, We and/or
        Our licensors own all rights to the intellectual property and material contained in this Website, and all such
        rights are reserved (“Website Material”).
      </p>
      <h2 className="text-lg my-3">4. Restrictions</h2>
      <p className="text-md font-sans font-light">You are expressly restricted from the following:</p>

      <ul className="list-disc ml-10 font-sans font-light">
        <li>Publishig Website Material in any media</li>
        <li>Selling, sublicensing and/or otherwise commercializing any Website Material</li>
        <li>Publicly performing and/or showing any Website Material</li>
        <li>Using this Website in any way that is, or may be, damaging to this Website</li>
        <li>Using this Website in any way that impacts user access to this Website</li>
        <li>
          Using this Website contrary to applicable laws and regulations, or in a way that causes, or may cause, harm to
          the Website, or to any person or business entity
        </li>
        <li>
          Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to
          this Website, or while using this Website
        </li>
        <li>Using this Website to engage in any advertising or marketing</li>
      </ul>
      <h2 className="text-lg my-3">5. No warranties</h2>
      <p className="text-md font-sans font-light">
        This Website is provided &quot;as is,&quot; with all faults, and We make no express or implied representations
        or warranties, of any kind related to this Website or the materials contained on this Website (including Website
        Material).
      </p>
      <h2 className="text-lg my-3">6. Limitation of liability</h2>
      <p className="text-md font-sans font-light">
        In no event shall We, nor any of Our officers, directors, and employees, be liable for anything arising out of
        or in any way connected with your use of this Website whether such liability is under contract, tort or
        otherwise.
      </p>
      <h2 className="text-lg my-3">7. Indemnification</h2>
      <p className="text-md font-sans font-light">
        You hereby indemnify to the fullest extent Us from and against any and/or all liabilities, costs, demands,
        causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of
        these Terms.
      </p>
      <h2 className="text-lg my-3">8. Severability</h2>
      <p className="text-md font-sans font-light">
        If any provision of these Terms is found to be unenforceable or invalid under any applicable law, such
        unenforceability or invalidity shall not render these Terms unenforceable or invalid as a whole, and such
        provisions shall be deleted without affecting the remaining provisions herein.
      </p>
      <h2 className="text-lg my-3">9. Variation of Terms</h2>
      <p className="text-md font-sans font-light">
        We are permitted to revise these terms at any time as it sees fit, and by using this Website you are expected to
        review such Terms on a regular basis to ensure you understand all terms and conditions governing use of this
        Website.
      </p>
      <h2 className="text-lg my-3">10. Assignment</h2>
      <p className="text-md font-sans font-light">
        We shall be permitted to assign, transfer, and subcontract its rights and/or obligations under these Terms
        without any notification or consent required. However, you shall not be permitted to assign, transfer, or
        subcontract any of your rights and/or obligations under these Terms
      </p>
      <h2 className="text-lg my-3">11. Entire Agreement</h2>
      <p className="text-md font-sans font-light">
        These Terms, including any legal notices and disclaimers contained on this Website, constitute the entire
        agreement between Us and you in relation to your use of this Website, and supersede all prior agreements and
        understandings with respect to the same.
      </p>
      <h2 className="text-lg my-3">12. Governing Law & Jurisdiction</h2>
      <p className="text-md font-sans font-light">
        These Terms will be governed by and construed in accordance with the laws of the Slovak Republic, and you submit
        to the non-exclusive jurisdiction of the state and federal courts located in Slovak Republic for the resolution
        of any disputes.
      </p>
    </div>
  );
}
