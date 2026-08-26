function ContactSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section id="page4" data-scroll-section>
      <div className="page4-inner">

        <div className="image-frame">
          <h2>Get in touch</h2>

          <div className="info-block">
            <h4>Social media</h4>
            <div className="socials">
              <span>f</span>
              <span>in</span>
              <span>t</span>
            </div>
          </div>
        </div>

        <div className="form-container">
          <form id="contactForm" onSubmit={handleSubmit}>

            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="First Name" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" />
              </div>
            </div>

            <div className="form-group">
              <label>Company Name</label>
              <input type="text" placeholder="RandomCompany" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Sample@gmail.com" />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="91+0000000000" />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Tell us what we can help you with"></textarea>
            </div>

            <div className="checkbox">
              <input type="checkbox" />
              <span>
                I&apos;d like to receive more information about company.
                I understand and agree to the <u>Privacy Policy</u>
              </span>
            </div>

            <button className="submit-btn" type="submit">Send Message</button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default ContactSection;
