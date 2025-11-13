import React from 'react';
import faqImg from '../assets/faq.png';

const Faq = () => {
    return (
        <div className='flex flex-col lg:flex-row items-center gap-5'>
            <figure className='flex-1'>
                <img src={faqImg} alt="" />
            </figure>
            <div className='flex-1'>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title font-semibold">What types of household services do you offer?</div>
                    <div className="collapse-content text-sm">We provide a wide range of services, including home cleaning, plumbing, electrical repairs, painting, appliance maintenance, and gardening. You can book one-time or recurring services based on your needs.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">How do I book a service?</div>
                    <div className="collapse-content text-sm">You can easily book through our website, mobile app, or by calling our customer support. Just choose the service you need, select your preferred date and time, and confirm your booking.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">Are your service professionals verified and trained?</div>
                    <div className="collapse-content text-sm">Yes, all our service providers go through a strict background check, verification process, and professional training to ensure quality and safety in every household service.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">What are your service hours?</div>
                    <div className="collapse-content text-sm">Our services are available from 8:00 AM to 8:00 PM, seven days a week. Emergency services are available 24/7 for urgent repairs and maintenance needs.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">How do I pay for the service?</div>
                    <div className="collapse-content text-sm">We accept multiple payment options including cash, credit/debit cards, mobile wallets, and online bank transfers. You can choose your preferred method at the time of booking or after service completion.</div>
                </div>
            </div>
        </div>
    );
};

export default Faq;