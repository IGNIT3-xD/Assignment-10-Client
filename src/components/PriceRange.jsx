import React, { useState } from 'react';
import { Range } from "react-range";


const MIN = 0
const MAX = 100

const PriceRange = () => {
    const [values, setValues] = useState([50, 90]);
    const [hoveredThumb, setHoveredThumb] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div className="flex flex-wrap justify-between items-center gap-4 bg-white/50 my-6 shadow-md rounded-xl p-6 w-[300px] hover:shadow-xl transition-all">
            <h1 className='text-center font-bold text-xl'>Price Range</h1>
            <div className="w-[280px]">
                <Range
                    values={values}
                    step={10}
                    min={MIN}
                    max={MAX}
                    onChange={(vals) => setValues(vals)}
                    onFinalChange={() => setIsDragging(false)}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "6px",
                                width: "100%",
                                background: `linear-gradient(to right,
                  oklch(87.9% 0.169 91.605) ${(values[0] / MAX) * 100}%,
                  #000 ${(values[0] / MAX) * 100}%,
                  #000 ${(values[1] / MAX) * 100}%,
                  oklch(87.9% 0.169 91.605) ${(values[1] / MAX) * 100}%)`,
                                borderRadius: "3px",
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props, index }) => (
                        <div
                            {...props}
                            onMouseEnter={() => setHoveredThumb(index)}
                            onMouseLeave={() => setHoveredThumb(null)}
                            onMouseDown={() => setIsDragging(true)}
                            onMouseUp={() => setIsDragging(false)}
                            style={{
                                ...props.style,
                                height: "30px",
                                width: "30px",
                                borderRadius: "50%",
                                backgroundColor: "#fff",
                                boxShadow: "0 0 10px rgba(59,130,246,0.4)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {(hoveredThumb === index || isDragging) && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-45px",
                                        backgroundColor: "#1e293b",
                                        color: "#fff",
                                        padding: "4px 10px",
                                        borderRadius: "6px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        minWidth: "60px",
                                        textAlign: "center",
                                        transition: "opacity 0.2s ease",
                                        opacity: 1,
                                    }}
                                >
                                    ${values[index]}
                                </div>
                            )}
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export default PriceRange;