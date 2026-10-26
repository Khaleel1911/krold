import manmitSingh from '../assets/testimonials_images/manmit_singh.jpeg'
import sanjeevMishra from '../assets/testimonials_images/sanjeev_mishra.jpeg'
import bandanaKhanna from '../assets/testimonials_images/bandana_khanna.jpeg'
import swetaDalmiya from '../assets/testimonials_images/sweta_dalmiya.jpeg'
import barnaliSarkar from '../assets/testimonials_images/barnali_sarkar.png'
import ankitSomani from '../assets/testimonials_images/ankit_somani.png'

// Client testimonials, as published on kroldmfins.com.
//
// Two kinds of client, each credited differently:
//   type: 'business'     → name, company and (optionally) location
//   type: 'professional' → profession and location (no name)
//
// photo (optional) replaces the initials avatar. The source shots are framed very differently,
// so each one names where the face sits (focus, as a CSS object-position) and how far to zoom
// in on it (zoom) to end up with a similar head-and-shoulders crop in the round avatar.
export const TESTIMONIALS = [
  {
    id: 't1',
    type: 'business',
    name: 'Manmeet Singh',
    photo: { src: manmitSingh, focus: '59% 36%', zoom: 1.25 },
    company: 'TRS Realtors',
    description:
      'Mr. Amit Mahansaria of Krold Mfins introduced me to the world of SIP. He explained to me how important it was for me to start doing it for future security and building a corpus. I have been regularly doing it for last 6 years and I am super happy with the advice and returns which Amit has been able to provide me.',
  },
  {
    id: 't2',
    type: 'business',
    name: 'Sanjeev Mishra',
    photo: { src: sanjeevMishra, focus: '50% 42%', zoom: 1.5 },
    company: 'Sea Leader DMCC',
    location: 'Dubai',
    description:
      'It’s been more than 4 years of association/relationship with Krold MFins Pvt. Ltd. They have an excellent team with very good support system and expertise for Customers of all range. My portfolio has grown more than expected under the guidance of this team. Wish the Company to grow in manifolds in future.',
  },
  {
    id: 't3',
    type: 'business',
    name: 'Bandana Khanna',
    photo: { src: bandanaKhanna, focus: '46% 37%', zoom: 1.35 },
    company: 'HR Department, Larsen & Toubro Ltd',
    description:
      'I have been associated with Krold MFins Pvt Ltd for the last 1.5 years. Their team has consistently demonstrated professionalism & integrity. The advice & strategies provided by them has helped me grow my portfolio. I would confidently recommend them to anyone seeking investment planning.',
  },
  {
    id: 't4',
    type: 'business',
    name: 'Shweta Dalmiya',
    photo: { src: swetaDalmiya, focus: '55% 38%', zoom: 1.9 },
    company: 'CA, CS, S Dalmiya and Associates',
    description:
      'I’ve been extremely happy with the way Krold Mfins has managed my mutual fund portfolio. Their smart strategies and timely advice have given me great returns, and I truly trust their expertise. Highly recommended for anyone looking to grow their investments with confidence.',
  },
  {
    id: 't5',
    type: 'business',
    name: 'Barnali Sarkar',
    photo: { src: barnaliSarkar, focus: '48% 36%', zoom: 1 },
    company: 'Sr GM, Godrej Properties Ltd',
    description:
      'Mr. Amit Mahansaria is a knowledgeable investment consultant who understands client goals and offers tailored, transparent solutions based on risk appetite. Over the years, he has guided me and my husband, helping grow our investments without ever push-selling.',
  },
  {
    id: 't6',
    type: 'business',
    name: 'Ankit Somani',
    photo: { src: ankitSomani, focus: '51% 28%', zoom: 2.9 },
    company: 'Director, Travel Dabble Pvt Ltd',
    description:
      'Krold Mfins has completely changed the way I think about money and investing. Their advice is practical, disciplined, and always tailored to my needs. I feel confident knowing my finances are being managed by a team that truly understands long-term wealth creation not just short-term gains.',
  },
]

export const HAPPY_CLIENTS_COUNT = 200
