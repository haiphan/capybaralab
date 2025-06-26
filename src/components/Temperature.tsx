const DEFAULT_TEMP_DATA = '2025-06-26T03:00,12.0;2025-06-26T04:00,10.7;2025-06-26T05:00,10.1;2025-06-26T06:00,10.0;2025-06-26T07:00,10.3;2025-06-26T08:00,10.9;2025-06-26T09:00,12.0;2025-06-26T10:00,13.3;2025-06-26T11:00,14.6;2025-06-26T12:00,15.8;2025-06-26T13:00,16.9;2025-06-26T14:00,17.6;2025-06-26T15:00,18.3;2025-06-26T16:00,19.1;2025-06-26T17:00,18.8;2025-06-26T18:00,19.1;2025-06-26T19:00,18.8;2025-06-26T20:00,18.4;2025-06-26T21:00,17.9;2025-06-26T22:00,16.5;2025-06-26T23:00,15.1;2025-06-27T00:00,14.0;2025-06-27T01:00,13.2;2025-06-27T02:00,12.4;2025-06-27T03:00,11.7;2025-06-27T04:00,11.3;2025-06-27T05:00,11.1;2025-06-27T06:00,12.0;2025-06-27T07:00,13.5;2025-06-27T08:00,14.9;2025-06-27T09:00,15.7;2025-06-27T10:00,16.7;2025-06-27T11:00,17.0;2025-06-27T12:00,17.5;2025-06-27T13:00,17.9;2025-06-27T14:00,17.1;2025-06-27T15:00,16.8;2025-06-27T16:00,17.1;2025-06-27T17:00,16.6;2025-06-27T18:00,16.5;2025-06-27T19:00,16.2;2025-06-27T20:00,15.8;2025-06-27T21:00,15.2;2025-06-27T22:00,14.8;2025-06-27T23:00,14.6;2025-06-28T00:00,14.3;2025-06-28T01:00,14.1;2025-06-28T02:00,14.0';

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
    // format the date as YYYY-MM-DDTHH
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