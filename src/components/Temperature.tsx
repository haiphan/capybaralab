const DEFAULT_TEMP_DATA = 'nodata';

const dataStr = process.env.REACT_APP_ELEC ?? DEFAULT_TEMP_DATA;
interface TRow {
    label: string;
    value: number;
}

const tempRows: TRow[] = dataStr.includes(';') ? dataStr.split(';').map((row) => {
    const [label, valueStr] = row.split(',');
    return {
        label: label,
        value: parseFloat(valueStr),
    };
}) : [];

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 13).split('-').join('');
}

function Temperature() {
    if (tempRows.length === 0) {
        return <p>nodata</p>;
    }
    const title = `Temperature`;
    const maxValue = Math.max(...tempRows.map(row => Math.abs(row.value)));
    return (
        <div>
            <div className="visualization-title">{title}</div>
            <div className="visualization-container">
                {tempRows.map((row, index) => {
                    const value = row.value;
                    const label = formatDate(row.label);
                    const isNegative = value < 0;
                    const barStyle = {
                        width: `${Math.abs(value) / maxValue * 100}%`,
                        backgroundColor: isNegative ? 'red' : 'green',
                    };
                    return (
                        <div key={index} className="visualization-row">
                            <span className="visualization-label">{label}</span>
                            <div className="visualization-bar" style={barStyle}>
                                {value.toFixed(2) + '°C'}
                            </div>
                        </div>
                    );
                }
                )}
            </div>
        </div>
    );
}

export default Temperature;