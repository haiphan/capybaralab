const DEFAULT_ELECTRICITY_DATA = 'nodata';

const dataStr = process.env.REACT_APP_ELEC ?? DEFAULT_ELECTRICITY_DATA;
interface ERow {
    label: string;
    value: number;
}

const electricityRows: ERow[] = dataStr.includes(';') ? dataStr.split(';').map((row) => {
    const [label, valueStr] = row.split(',');
    return {
        label: label,
        value: parseFloat(valueStr),
    };
}) : [];

function Electricity() {
    if (electricityRows.length === 0) {
        return <p>nodata</p>;
    }
    const day = electricityRows[0].label.split('T')[0];
    const title = `Price for ${day}`
    const maxValue = Math.max(...electricityRows.map(row => Math.abs(row.value)));
    return (
        <div>
            <div className="visualization-title">{title}</div>
            <div className="visualization-container">
                {electricityRows.map((row, index) => {
                    const value = row.value;
                    const label = row.label;
                    const d = new Date(label);
                    const h = d.getHours().toString().padStart(2, '0');;
                    const isNegative = value < 0;
                    const barStyle = {
                        width: `${Math.abs(value) / maxValue * 100}%`,
                        backgroundColor: isNegative ? 'red' : 'green',
                    };
                    return (
                        <div key={index} className="visualization-row">
                            <span className="visualization-label">{h}</span>
                            <div className="visualization-bar" style={barStyle}>
                                {value.toFixed(3)}
                            </div>
                        </div>
                    );
                }
                )}
            </div>
        </div>
    );
}

export default Electricity;