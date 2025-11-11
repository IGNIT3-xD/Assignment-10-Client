import React, { useState } from 'react';
import { Range } from "react-range";
import { useAxios } from '../hooks/useAxios';

const MIN = 0;
const MAX = 500;

const PriceRange = ({ setData }) => {
    const [values, setValues] = useState([0, MAX]);
    const [hoveredThumb, setHoveredThumb] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const instance = useAxios()

    const handleRangeChange = async (vals) => {
        setValues(vals);
    };

    const handleFinalChange = async (vals) => {
        setIsDragging(false);
        try {
            const { data } = await instance.get(`/services?min=${vals[0]}&max=${vals[1]}`);
            setData(data);
        } catch (err) {
            console.error("Error fetching filtered services:", err);
        }
    };



    return (
        <div className="flex flex-wrap justify-between items-center gap-4 bg-white/50 my-6 shadow-md rounded-xl p-6 w-[300px] hover:shadow-xl transition-all">
            <h1 className="text-center font-medium">Filter By Price Range</h1>
            <div className="w-[280px]">
                <Range
                    values={values}
                    step={10}
                    min={MIN}
                    max={MAX}
                    onChange={handleRangeChange}
                    onFinalChange={handleFinalChange}

                    renderTrack={({ props, children }) => {
                        const { key, ...rest } = props;
                        return (
                            <div key={key}
                                {...rest}
                                style={{
                                    ...rest.style,
                                    height: "6px",
                                    width: "100%",
                                    background: `linear-gradient(to right,
                    oklch(87.9% 0.169 91.605) ${(values[0] / MAX) * 100}%,
                    oklch(75.0% 0.169 91.605) ${(values[0] / MAX) * 100}%,
                    oklch(87.9% 0.169 91.605) ${(values[1] / MAX) * 100}%,
                    oklch(87.9% 0.169 91.605) ${(values[1] / MAX) * 100}%)`,
                                    borderRadius: "3px",
                                }}
                            >
                                {children}
                            </div>
                        );
                    }}

                    renderThumb={({ props, index }) => {
                        const { key, ...rest } = props;
                        return (
                            <div key={key}
                                {...rest}
                                onMouseEnter={() => setHoveredThumb(index)}
                                onMouseLeave={() => setHoveredThumb(null)}
                                onMouseDown={() => setIsDragging(true)}
                                onMouseUp={() => setIsDragging(false)}
                                style={{
                                    ...rest.style,
                                    height: "20px",
                                    width: "20px",
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
                        );
                    }}
                />
            </div>
        </div>
    );
};

export default PriceRange;
