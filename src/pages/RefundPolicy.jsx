import { Wrapper } from '../components';

const RefundPolicy = () => {
  return (
    <Wrapper>
      <div className='flex flex-col space-y-5 font-inter'>
        <h1 className='text-2xl font-bold font-onest'>
          Refund Policy
        </h1>
        <p>
          Thank you for choosing to stay with us. Please carefully review our No Refund Policy before completing your booking. By confirming your reservation, you acknowledge and agree to the following terms:
        </p>

        <h2 className='font-bold text-lg font-onest mt-0.5'>
          All Sales Are Final
        </h2>

        <p>
          Once a reservation is made and payment is processed, it is considered final. We do not offer refunds for any reason, including but not limited to changes in travel plans, illness, weather conditions, personal emergencies, or dissatisfaction with the accommodation.
        </p>

        <h2 className='font-bold text-lg font-onest mt-0.5'>
          Cancellation Policy
        </h2>

        <p>
          Guests who choose to cancel their reservation for any reason will not be eligible for a refund. We strongly recommend purchasing travel insurance to protect against unforeseen circumstances.
        </p>

        <h2 className='font-bold text-lg font-onest mt-0.5'>
          Modifications and Rescheduling
        </h2>

        <p>
          While refunds are not provided, we may, at our sole discretion, offer a one-time change of dates if requested at least 60 days before check-in, subject to availability and any applicable rate differences.
        </p>

        <h2 className='font-bold text-lg font-onest mt-0.5'>
          No-Shows and Early Departures
        </h2>
        <p>
          Guests who fail to check in or choose to leave before their scheduled departure date will not receive a refund or credit for unused nights.
        </p>
        <h2 className='font-bold text-lg font-onest mt-0.5'>
          Force Majeure
        </h2>
        <p>
          In the event of natural disasters, government travel restrictions, or other extraordinary circumstances beyond our control, refunds will not be issued. Guests are encouraged to check with their travel insurance provider for coverage options.
        </p>

        <h2 className='font-bold text-lg font-onest mt-0.5'>
          Chargebacks and Disputes
        </h2>

        <p>
          Any attempts to dispute charges through a financial institution after agreeing to this policy may result in additional fees and legal action to recover lost revenue.
        </p>
        <p>
          We appreciate your understanding and cooperation. If you have any questions, please contact us before booking.
        </p>
      </div>
    </Wrapper>
  );
};

export default RefundPolicy;