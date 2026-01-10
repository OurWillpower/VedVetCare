import React from 'react';

const AboutUs = () => {
  const styles = {
    section: {
      padding: '60px 20px',
      backgroundColor: '#f9fafb',
      color: '#333',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
    },
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
    },
    heading: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#2c3e50', // Dark Blue/Grey
      marginBottom: '10px',
      textAlign: 'center',
    },
    subHeading: {
      fontSize: '20px',
      color: '#27ae60', // Green for nature/vet theme
      marginBottom: '40px',
      textAlign: 'center',
      fontStyle: 'italic',
    },
    contentBlock: {
      marginBottom: '30px',
    },
    list: {
      listStyleType: 'none',
      paddingLeft: '0',
    },
    listItem: {
      marginBottom: '10px',
      paddingLeft: '20px',
      borderLeft: '4px solid #27ae60',
    },
    callToAction: {
      marginTop: '40px',
      padding: '20px',
      backgroundColor: '#e8f5e9',
      border: '1px solid #c8e6c9',
      borderRadius: '8px',
      textAlign: 'center',
      fontWeight: '500',
    }
  };

  return (
    <section style={styles.section} id="about-us">
      <div style={styles.container}>
        <h2 style={styles.heading}>About Ved Vet Care</h2>
        <p style={styles.subHeading}>Where Science Meets Tradition</p>

        <div style={styles.contentBlock}>
          <p>
            At Ved Vet Care, we bridge the gap between ancient Ayurvedic wisdom and modern veterinary science. 
            We are dedicated to revolutionizing animal health by delivering products that are as effective as they are natural.
          </p>
        </div>

        <div style={styles.contentBlock}>
          <h3>Our Expertise</h3>
          <p>We specialize in two core pillars of animal husbandry:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <strong>Precision Nutrition:</strong> Our animal feed is meticulously formulated to meet the specific nutritional requirements of livestock, ensuring optimal growth, immunity, and development.
            </li>
            <li style={styles.listItem}>
              <strong>Ayurvedic Medicine:</strong> Leveraging time-honored herbal remedies, our veterinary medicines offer potent, natural solutions designed to boost fertility and enhance lactation without side effects.
            </li>
          </ul>
        </div>

        <div style={styles.contentBlock}>
          <h3>Our Commitment</h3>
          <p>
            Quality is our signature. From ethically sourcing raw ingredients to delivering the final product, every step of our process is governed by strict sustainability standards. 
            Our team of experts is constantly engaged in research and innovation, ensuring that Ved Vet Care remains at the forefront of the industry.
          </p>
        </div>

        <div style={styles.callToAction}>
          <p>
            Join us in creating a future where farm productivity and animal health go hand in hand. 
            With Ved Vet Care, your livestock flourishes, and your business grows.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
