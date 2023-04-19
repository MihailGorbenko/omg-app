import { useLocation, useOutlet } from "react-router";
import styles from '../styles/Auth/AuthLayout.module.css'
import { createRef, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Container, Row, Col } from "react-bootstrap";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const blocksReturnTime = 500
const formAppearTime = 500

export const AuthLayout: React.FC = () => {

  const [blockSlide, setBlockSlide] = useState(false)
  const leftBlock = useRef(null)
  const rightBlock = useRef(null)
  const formContainer = useRef(null)
  const outlet = useOutlet()
  const location = useLocation()

  const routesRefs = new Map()
  routesRefs
    .set('/login', createRef())
    .set('/register', createRef())
    .set('/auth', createRef())

  useEffect(() => {
    if (routesRefs.get(location.state?.from.pathname))
      setBlockSlide(true)

  }, [location.pathname])


  return (
    <div className={styles.layout}>
      <CSSTransition
        nodeRef={leftBlock}
        in={blockSlide}
        timeout={blocksReturnTime}
        classNames={{
          enter: styles['left-block-enter'],
          enterActive: styles['left-block-enter-active'],
          exit: styles['left-block-exit'],
          exitActive: styles['left-block-exit-active']
        }}
        onEnter={() => {
          setTimeout(() => setBlockSlide(false), blocksReturnTime)
        }}>
        <div ref={leftBlock} className={classNames(
          styles['left-block'],
        )}>
        </div>
      </CSSTransition>
      <CSSTransition
        nodeRef={rightBlock}
        in={blockSlide}
        timeout={blocksReturnTime}
        classNames={{
          enter: styles['right-block-enter'],
          enterActive: styles['right-block-enter-active'],
          exit: styles['right-block-exit'],
          exitActive: styles['right-block-exit-active']
        }}>
        <div ref={rightBlock} className={classNames(
          styles['right-block'],
        )}></div>
      </CSSTransition>
      <Container ref={formContainer} className={styles['form-container']}>
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={routesRefs.get(location.pathname)}
            timeout={formAppearTime}
            unmountOnExit
            classNames={{
              enter: styles['form-enter'],
              enterActive: styles['form-enter-active'],
              exit: styles['form-exit'],
              exitActive: styles['form-exit-active']
            }}
          >
            {(state) => (
              <Row ref={routesRefs.get(location.pathname)} className='justify-content-center'>
                <Col md={6} lg={5} xl={4} >
                  {outlet}
                </Col>
              </Row>
            )}
          </CSSTransition>
        </SwitchTransition>
      </Container>
    </div>
  );
};
