import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as HomeBlackIcon } from '@/icon/home_black.svg';

function Breadcrumb() {
  const location = useLocation();
  const pathname = location.pathname; // 현재 경로

  // 경로에 따라서 보여줄 데이터 설정
  let dataText = '';
  let path1Text = '';

  switch (pathname) {
    case '/':
      // dataText = 'Data';
      // path1Text = 'path1';
      break;
    // 다른 경로에 대한 설정 추가
    case '/ticketbook/bus':
      dataText = '예매';
      path1Text = '버스';
      break;

      case '/ticketbook/train':
        dataText = '예매';
        path1Text = '기차';
        break;

        case '/ticketbook/plane':
          dataText = '예매';
          path1Text = '공항';
          break;

          // case '/ticketbook/plane':
          //   dataText = '예약';
          //   path1Text = '비행기';
          //   break;

          //   case '/ticketbook/plane':
          //     dataText = '예약';
          //     path1Text = '비행기';
          //     break;

          //     case '/ticketbook/plane':
          //       dataText = '예약';
          //       path1Text = '비행기';
          //       break;
      
    default:
      break;
  }

  return (
    <div className="b-example-divider">
      <div className="container my-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <nav aria-label="breadcrumb" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', textAlign: 'left', width: '100%', marginTop: '-70px', marginLeft: '-60px' }}>
          <ol className="breadcrumb breadcrumb-chevron p-3 rounded-3">
            <li className="breadcrumb-item">
              <Link to ={"/"} className="link-body-emphasis">
                <HomeBlackIcon className="bi" width="16" height="16"/>
                <span className="visually-hidden" style={{marginTop:'15px'}} >Home</span>
              </Link>
            </li>

            <li className="breadcrumb-item">
              <a className="link-body-emphasis text-decoration-none" style={{marginTop:'15px'}} href="#">{dataText}</a>
            </li>
           
            <li className="breadcrumb-item">

              {path1Text === '버스' &&
              <Link to = {'/ticketbook/bus'} className="link-body-emphasis fw-semibold text-decoration-none">{path1Text}</Link>
              }
               {path1Text === '기차' &&
              <Link to = {'/ticketbook/train'} className="link-body-emphasis fw-semibold text-decoration-none">{path1Text}</Link>
              }
               {path1Text === '공항' &&
              <Link to = {'/ticketbook/plane'} className="link-body-emphasis fw-semibold text-decoration-none">{path1Text}</Link>
              }
            </li>
           
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default Breadcrumb;
