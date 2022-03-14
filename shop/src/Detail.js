import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";

import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";

import { CSSTransition } from "react-transition-group";

function Detail(props) {
  let [alert, change_alert] = useState(true);
  let [inputData, change_inputData] = useState("");
  let [tab, change_tab] = useState(0);
  let [myswitch, change_myswitch] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      change_alert(false);
    }, 2000);
    console.log("hi");
    return () => {
      clearTimeout(timer);
    };
  }, []); // 두 번째 인자 : useEffect 실행조건!

  let history = useHistory();
  let { id } = useParams();

  let 찾은항목 = props.shoes.find((상품) => {
    return 상품.id == id;
  });

  // return 구문 빼먹지 말자..!
  return (
    <div className="container">
      {alert === true ? (
        <div className="my-alert2">
          <p>재고가 얼마 남지 않았습니다!</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (parseInt(id) + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은항목.title}</h4>
          <p>{찾은항목.content}</p>
          <p>{찾은항목.price}원</p>

          <Info stock={props.stock}></Info>

          <button
            className="btn btn-danger"
            onClick={() => {
              props.change_stock([9, 11, 12]); // 사본 state 저장, 전송
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.push("/");
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              change_myswitch(false);
              change_tab(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              change_myswitch(false);
              change_tab(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={myswitch} classNames="wow" timeout={500}>
        <TabContent tab={tab} change_myswitch={change_myswitch} />
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.change_myswitch(true);
  });
  if (props.tab === 0) {
    return <div>0번째 내용입니다</div>;
  } else if (props.tab === 1) {
    return <div>1번째 내용입니다</div>;
  } else if (props.tab === 2) {
    return <div>2번째 내용입니다</div>;
  }
}

function Info(props) {
  return <p>재고 : {props.stock[0]} </p>;
}
export default Detail;
