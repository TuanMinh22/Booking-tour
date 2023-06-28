import React, { useEffect, useState } from 'react'
import TourCard from '../../shared/TourCard'
// import tourData from '../../assets/data/tours'
import { Col } from 'reactstrap'
import useFetch from './../../hooks/useFetch'
import { BASE_URL } from './../../utils/config'
import axios from 'axios'

const FeaturedTourList = () => {
  const [info, setInfo] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/tours/getFetures`);
        setInfo(res.data.data);
        setLoading(false);
        console.log(res.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  // const loading = true;
  // const error = false;
  const featuredTours = [{ Tour_ID: 31, nameTour: "Tour 5N4Đ: Khám Phá Hàn Quốc - Xứ Sở Kim Chi - Bay Vietnam Airlines - từ Hà Nội (TGHQ2)", address: "Hàn Quốc", Tour_price: 18990000 }]
  return (
    <>
      {loading && <h4>Loading.....</h4>}
      {error && <h4>{error}</h4>}
      {
        !loading && !error &&
        info?.map(tour => (
          <Col lg='3' md='4' sm='6' className='mb-4' key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))
      }
    </>
  )
}

export default FeaturedTourList 