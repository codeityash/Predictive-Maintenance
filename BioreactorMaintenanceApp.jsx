
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function BioreactorMaintenanceApp() {
  const [inputData, setInputData] = useState({
    temperature: '',
    pressure: '',
    pH: '',
    DO_level: '',
    vibration: '',
    runtime_hours: '',
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const predictMaintenance = () => {
    const { temperature, pressure, pH, DO_level, vibration, runtime_hours } = inputData;
    const temp = parseFloat(temperature);
    const pres = parseFloat(pressure);
    const ph = parseFloat(pH);
    const doLevel = parseFloat(DO_level);
    const vib = parseFloat(vibration);
    const runTime = parseInt(runtime_hours);

    const maintenance =
      temp > 39 ||
      pres > 1.3 ||
      ph < 6.3 ||
      doLevel < 45 ||
      vib > 0.8 ||
      runTime > 1000
        ? 'Yes'
        : 'No';

    setResult(maintenance);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <Card className="p-4 shadow-lg">
        <CardContent className="grid gap-4">
          <h1 className="text-2xl font-bold">Bioreactor Predictive Maintenance</h1>
          {Object.entries(inputData).map(([key, value]) => (
            <Input
              key={key}
              name={key}
              type="number"
              placeholder={key.replace('_', ' ')}
              value={value}
              onChange={handleChange}
            />
          ))}
          <Button onClick={predictMaintenance}>Predict</Button>
          {result !== null && (
            <div className="mt-4 text-lg">
              Maintenance Required: <strong>{result}</strong>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
