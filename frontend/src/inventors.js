import React from 'react';
import profile1 from './images/profile1.jpg'; 
import profile2 from './images/profile2.jpg'; 
import { Row, Col } from 'react-bootstrap';

const Inventors = () => {
  return (
    <div className="container" style={{ backgroundColor: '#f9f7f2', padding: '30px', borderRadius: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
      <div className="row g-5">
        <div className="col-md-8">
          <h3 className="pb-4 mb-4 fst-italic border-bottom" style={{ color: '#333' }}>About the Authors</h3>
          <article className="blog-post">
            <img src={profile1} alt="Honey Reddy Nagireddy" style={{ width: '250px', height: '400px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}/>
            <h2 className="blog-post-title" style={{ color: '#333', fontSize: '1.8rem', fontWeight: 'bold', marginTop: '20px' }}>Honey Reddy Nagireddy</h2>
            <p className="blog-post-meta" style={{ color: '#555', fontSize: '1.2rem' }}>December 2025, Iowa State University</p>
            <p className="blog-post-content" style={{ color: '#555', fontSize: '1.2rem', marginBottom: '20px' }}>I'm Honey Reddy Nagireddy, a passionate and driven Computer
             Science student on a journey of exploration and growth. Beyond the lines on my resume, I'm a tech enthusiast with an unwavering commitment to making a meaningful 
             
             difference. I am really very excited to build this website and thrilled to learn more about web development in this course.</p>
            <p style={{ color: '#555' }}>Email: hzn0030@iastate.edu</p>
            <hr/>
            <img src={profile2} alt="Preethi Reddy Nagireddy" style={{ width: '250px', height: 'auto', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}/>
            <h2 className="blog-post-title" style={{ color: '#333', fontSize: '1.8rem', fontWeight: 'bold', marginTop: '20px' }}>Preethi Reddy Nagireddy</h2>
            <p className="blog-post-meta" style={{ color: '#555', fontSize: '1.2rem' }}>December 2025, Iowa State University</p>
            <p className="blog-post-content" style={{ color: '#555', fontSize: '1.2rem', marginBottom: '20px' }}>I, Preethi Reddy Nagireddy,  am pursuing bachelor's degree 
            in Computer Science at Iowa State University. Expected graduation is in Fall 2025. Noteworthy projects, like developing a Python-based Graphical User Interface 
            for car temperature control, exemplify my proficiency and teamwork. I'm thrilled to work on this website and eager to broaden my understanding of web development 
            during this course.</p>
            <p style={{ color: '#555' }}>Email: pznr07@iastate.edu</p>
          </article>
          <Row className="mt-3">
          <Col md={12} className="text-center mb-4">
            <footer>
              <p style={{ color: '#555' }}>© {new Date().getFullYear()} Honey Reddy Nagireddy, Preethi Reddy Nagireddy. All rights reserved.</p>
            </footer>
          </Col>
        </Row>
        </div>
        <div className="col-md-4">
          <div className="position-sticky" style={{ top: '2rem' }}>
            <div className="p-4 mb-3 rounded" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
              <h4 className="fst-italic" style={{ color: '#333' }}>Course Information</h4>
              <p className="mb-0" style={{ color: '#555' }}>Instructor: Dr. Abraham Aldaco, Ph.D</p>
              <p className="mb-0" style={{ color: '#555' }}>Email: aaldaco@iastate.edu</p>
              <p className="mb-0" style={{ color: '#555' }}>Name: ComS319 Construction of User Interfaces, Spring 2024 (Section: 3)</p>
              <p className="mb-0" style={{ color: '#555' }}>Date: April 4th, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventors;