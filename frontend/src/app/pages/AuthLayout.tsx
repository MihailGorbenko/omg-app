import { Outlet, useLocation, useNavigate } from "react-router";
import styles from '../styles/Auth/AuthLayout.module.css'
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import AuthActions from "../components/AuthActions";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch, useTypedSelector } from "../store/store";
import { selectAuth } from "../features/authentication/authSlice";

const blocksReturnTime = 600
const formAppearTime = 600

export const AuthLayout: React.FC = () => {

  const [blockSlide, setBlockSlide] = useState(false)
  const [showActions, setShowActions] = useState(true)
  const leftBlock = useRef(null)
  const rightBlock = useRef(null)
  const formContainer = useRef(null)
  const authState = useTypedSelector(selectAuth)
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.fromForm) {
      setShowActions(true)
    }

  })


  const startTransition = (show: boolean) => {
    setBlockSlide(true)
  }

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
        onEnter={() =>{
          setShowActions(false)
          setTimeout(() => setBlockSlide(false), blocksReturnTime)
        } }>
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
      {showActions &&

          <CSSTransition
            nodeRef={formContainer}
            in={showActions}
            timeout={formAppearTime}
            classNames={{
              enter: styles['form-enter'],
              enterActive: styles['form-enter-active'],
              exit: styles['form-exit'],
              exitActive: styles['form-exit-active']
            }}
          >
            <AuthActions  startTransition={startTransition} />
          </CSSTransition>

      }
      <Container ref={formContainer} className={styles['form-container']}>
        <CSSTransition
          nodeRef={formContainer}
          in={!showActions}
          timeout={formAppearTime}
          classNames={{
            enter: styles['form-enter'],
            enterActive: styles['form-enter-active'],
            exit: styles['form-exit'],
            exitActive: styles['form-exit-active']
          }}
        >
          <Outlet />
        </CSSTransition>
      </Container>


    </div>
  );
};
