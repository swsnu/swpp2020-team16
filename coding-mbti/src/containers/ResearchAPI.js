import React, { PureComponent } from 'react';
import ResearchAPIContent from '../components/ResearchAPIContent';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

class ResearchAPI extends PureComponent {
  render() {
    return (
      <>
        <Navbar />
        <ResearchAPIContent />
        <Footer />
      </>
    );
  }
}

export default ResearchAPI;
