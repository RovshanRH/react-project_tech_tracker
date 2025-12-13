import { useEffect, useState, useRef } from 'react';
import './ProgressHeader.css';

function ProgressHeader(props: { AllCount: number; FinishedCount: number }) {
    const [displayedProgress, setDisplayedProgress] = useState(0);
    const prevProgressRef = useRef(0);
    
    // Рассчитываем реальный процент
    const targetProgress = props.AllCount > 0 
        ? (props.FinishedCount / props.AllCount) * 100 
        : 0;
    const easeOutCubic = (t: number) => {
        return 1 - Math.pow(1 - t, 3);
    };
    
    // Плавная анимация прогресса
    useEffect(() => {
        let animationFrame: number;
        const duration = 1000; // 1 секунда анимации
        const startTime = Date.now();
        const startValue = prevProgressRef.current;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing функция для плавности
            const eased = easeOutCubic(progress);
            const currentValue = startValue + (targetProgress - startValue) * eased;
            
            setDisplayedProgress(currentValue);
            
            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                prevProgressRef.current = targetProgress;
            }
        };
        
        animate();
        
        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [targetProgress]);
    
    // Easing функция
    
    
    // Форматирование числа для отображения
    const formatProgress = (value: number) => {
        return Math.round(value);
    };
    
    return (
        <div className="progress-header">
            <div className="progress-card">
                <div className="progress-title">Progress Bar</div>
                <div 
                    className="dynamic-progress" 
                    style={{ 
                        '--progress': displayedProgress,
                        '--color': '#0B555B',
                        '--completed-color': '#086303',
                        '--remaining-color': '#F5F5F5'
                    } as React.CSSProperties}
                    role="progressbar"
                    aria-valuenow={formatProgress(displayedProgress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div className="progress-text">
                        <span className="finished-count">{props.FinishedCount}</span>
                        <span className="separator">/</span>
                        <span className="total-count">{props.AllCount}</span>
                    </div>
                    <div className="progress-percentage">
                        {formatProgress(displayedProgress)}%
                    </div>
                </div>
                <p className="progress-subtitle">Finished Technologies / Total Technologies</p>
                
                {/* Индикатор выполнения */}
                <div className="progress-indicators">
                    <div className="indicator completed">
                        <div className="indicator-dot"></div>
                        <span>Completed: {props.FinishedCount}</span>
                    </div>
                    <div className="indicator remaining">
                        <div className="indicator-dot"></div>
                        <span>Remaining: {props.AllCount - props.FinishedCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressHeader;