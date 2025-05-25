import React, { useState } from 'react';
import { EPage, useActivePageStore } from '../../state-management/activePage';
import uuid from 'react-uuid';
import {
  usePlantTypes,
  usePlants,
  useRetrieveSensors,
} from '@/app/hooks/usePlants';

export interface Plant {
  id: string;
  name: string;
  description: string;
  location: string;
  typeAlias: string;
  adoptionDate: string;
  sensors: Sensor[];
}

export interface Sensor {
  id: string;
  label: string;
  quantity: string;
  unit: string;
}

export default function Configurator() {
  const { activePage } = useActivePageStore();
  const [step, setStep] = useState(1);
  const [deviceName, setDeviceName] = useState('');
  const [deviceId] = useState(uuid());
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  // State for expanded/collapsed plant cards
  const [expandedPlants, setExpandedPlants] = useState<{
    [id: string]: boolean;
  }>({});
  // State for expanded/collapsed sensor cards per plant
  const [expandedSensors, setExpandedSensors] = useState<{
    [plantId: string]: { [sensorId: string]: boolean };
  }>({});
  const { types: plantTypes, loading: plantTypesLoading } = usePlantTypes();

  // Fetch already configured plants (assume one device: moniplant)
  const { plants: configuredPlants, loading: configuredPlantsLoading } =
    usePlants();

  // Use useRetrieveSensors for the selected plant
  const selectedPlant =
    configuredPlants.find((p) => p.id === selectedPlantId) ||
    configuredPlants[0];
  const selectedPlantIdForHook = selectedPlant ? selectedPlant.id : '';
  const {
    sensors: selectedPlantSensors,
    loading: selectedPlantSensorsLoading,
  } = useRetrieveSensors(selectedPlantIdForHook);

  const handleAddPlant = () => {
    const newPlant: Plant = {
      id: uuid(),
      name: '',
      description: '',
      location: '',
      typeAlias: '',
      adoptionDate: '',
      sensors: [],
    };
    setPlants([...plants, newPlant]);
  };

  const handlePlantChange = (id: string, field: string, value: string) => {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, [field]: value } : plant
      )
    );
  };

  const handleAddSensor = (plantId: string) => {
    const newSensor = {
      id: uuid(),
      label: '',
      quantity: '',
      unit: '',
    };
    setPlants(
      plants.map((plant: Plant) =>
        plant.id === plantId
          ? { ...plant, sensors: [...plant.sensors, newSensor] }
          : plant
      )
    );
  };

  // Add delete handlers
  const handleDeletePlant = (plantId: string) => {
    setPlants(plants.filter((plant) => plant.id !== plantId));
  };

  const handleDeleteSensor = (plantId: string, sensorId: string) => {
    setPlants(
      plants.map((plant) =>
        plant.id === plantId
          ? {
              ...plant,
              sensors: plant.sensors.filter((sensor) => sensor.id !== sensorId),
            }
          : plant
      )
    );
  };

  const togglePlantExpand = (plantId: string) => {
    setExpandedPlants((prev) => ({ ...prev, [plantId]: !prev[plantId] }));
  };

  const toggleSensorExpand = (plantId: string, sensorId: string) => {
    setExpandedSensors((prev) => ({
      ...prev,
      [plantId]: {
        ...(prev[plantId] || {}),
        [sensorId]: !(prev[plantId] || {})[sensorId],
      },
    }));
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  // Device info (fixed, from .env)
  const defaultDeviceName = 'Moniplant (rpi5)';
  const apiUrl = process.env.API_URL || 'http://rpi5.local:3000';
  const mqttUrl = process.env.MQTT_BROKER_URL || 'mqtt://rpi5.local:8883';

  return (
    <>
      <div className='configurator info-card relative w-full max-w-4xl overflow-hidden overflow-y-auto bg-transparent bg-opacity-50 bg-gradient-to-r from-green-200 to-blue-200 p-6 text-green-700 shadow-lg'>
        <div
          className='flex w-full transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
        >
          {/* Step 1: Device Form */}
          <div className='min-w-full flex-shrink-0 p-6'>
            <h1 className='mb-4 text-2xl font-bold'>Device Configuration</h1>
            <div className='mb-6'>
              <label className='mb-2 block text-lg font-medium'>
                Device Name
              </label>
              <input
                type='text'
                value={defaultDeviceName}
                disabled
                className='w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-500'
              />
              <p className='mt-2 text-sm text-gray-600'>
                Device ID: moniplant-rpi5
              </p>
              <div className='mt-2 text-sm text-gray-600'>
                <div>
                  <span className='font-semibold'>API URL:</span> {apiUrl}
                </div>
                <div>
                  <span className='font-semibold'>MQTT Broker URL:</span>{' '}
                  {mqttUrl}
                </div>
              </div>
            </div>
            <div className='flex gap-4'>
              <button
                type='button'
                onClick={nextStep}
                className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
              >
                Edit Plants
              </button>
            </div>
          </div>

          {/* Step 2: Plant Form */}
          <div className='min-w-full flex-shrink-0 overflow-y-auto p-6'>
            <h1 className='mb-4 text-2xl font-bold'>Add Plants</h1>
            {/* Show already configured plants */}
            {!configuredPlantsLoading && configuredPlants.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-2 text-lg font-semibold text-green-700'>
                  Configured Plants (moniplant)
                </h2>
                <div className='flex flex-wrap gap-4'>
                  {configuredPlants.map((plant) => (
                    <button
                      key={plant.id}
                      onClick={() => setSelectedPlantId(plant.id)}
                      className={`rounded-lg border px-4 py-2 ${selectedPlantId === plant.id || (!selectedPlantId && configuredPlants[0]?.id === plant.id) ? 'border-green-600 bg-green-200' : 'border-gray-300 bg-gray-100'} font-semibold text-gray-800`}
                    >
                      {plant.name}
                    </button>
                  ))}
                </div>
                {selectedPlant && (
                  <div className='mt-4 rounded-lg border bg-green-50 p-4'>
                    <div className='font-bold'>{selectedPlant.name}</div>
                    <div className='text-sm text-gray-700'>
                      Type: {selectedPlant.plantTypeAlias}
                    </div>
                    <div className='text-sm text-gray-700'>
                      Location: {selectedPlant.location}
                    </div>
                    <div className='text-sm text-gray-700'>
                      Adoption Date: {selectedPlant.adoptionDate}
                    </div>
                    {selectedPlantSensorsLoading ? (
                      <div className='text-xs text-gray-400'>
                        Loading sensors...
                      </div>
                    ) : selectedPlantSensors &&
                      selectedPlantSensors.length > 0 ? (
                      <div className='mt-2'>
                        <div className='font-semibold text-green-800'>
                          Sensors:
                        </div>
                        <ul className='list-inside list-disc'>
                          {selectedPlantSensors.map((sensor) => (
                            <li
                              key={sensor.id}
                              className='text-xs text-gray-800'
                            >
                              {sensor.label} ({sensor.quantity} {sensor.unit})
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className='text-xs text-gray-400'>
                        No sensors configured.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {plants.map((plant, index) => (
              <div
                key={plant.id}
                className='relative mb-6 rounded-lg border bg-gray-50 p-4'
              >
                <button
                  type='button'
                  onClick={() => handleDeletePlant(plant.id)}
                  className='absolute right-2 top-2 text-3xl font-bold text-red-500 hover:text-red-700'
                  title='Delete Plant'
                >
                  ×
                </button>
                <button
                  type='button'
                  onClick={() => togglePlantExpand(plant.id)}
                  className='absolute left-2 top-2 rounded-full bg-white bg-opacity-80 px-2 py-0.5 text-xl font-bold text-gray-500 shadow hover:text-gray-700'
                  title={expandedPlants[plant.id] ? 'Collapse' : 'Expand'}
                >
                  {expandedPlants[plant.id] ? '−' : '+'}
                </button>
                <h3 className='mb-2 pl-8 text-lg font-medium'>
                  Plant {index + 1}
                </h3>
                <p className='mb-2 pl-8 text-sm text-gray-600'>
                  Plant ID: {plant.id}
                </p>
                {expandedPlants[plant.id] && (
                  <>
                    <div className='mb-4'>
                      <label className='mb-1 block text-sm font-medium'>
                        Plant Name
                      </label>
                      <input
                        type='text'
                        value={plant.name}
                        onChange={(e) =>
                          handlePlantChange(plant.id, 'name', e.target.value)
                        }
                        className='w-full rounded-lg border border-gray-300 p-2'
                      />
                    </div>
                    <div className='mb-4'>
                      <label className='mb-1 block text-sm font-medium'>
                        Description
                      </label>
                      <textarea
                        value={plant.description}
                        onChange={(e) =>
                          handlePlantChange(
                            plant.id,
                            'description',
                            e.target.value
                          )
                        }
                        className='w-full rounded-lg border border-gray-300 p-2'
                      ></textarea>
                    </div>
                    <div className='mb-4'>
                      <label className='mb-1 block text-sm font-medium'>
                        Location
                      </label>
                      <input
                        type='text'
                        value={plant.location}
                        onChange={(e) =>
                          handlePlantChange(
                            plant.id,
                            'location',
                            e.target.value
                          )
                        }
                        className='w-full rounded-lg border border-gray-300 p-2'
                      />
                    </div>
                    <div className='mb-4'>
                      <label className='mb-1 block text-sm font-medium'>
                        Plant Type Alias
                      </label>
                      <select
                        value={plant.typeAlias}
                        onChange={(e) =>
                          handlePlantChange(
                            plant.id,
                            'typeAlias',
                            e.target.value
                          )
                        }
                        className='w-full rounded-lg border border-gray-300 p-2'
                        disabled={plantTypesLoading}
                      >
                        <option value=''>Select Type</option>
                        {plantTypes &&
                          plantTypes.map((type) => (
                            <option key={type.alias} value={type.alias}>
                              {type.full_name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className='mb-4'>
                      <label className='mb-1 block text-sm font-medium'>
                        Adoption Date
                      </label>
                      <input
                        type='date'
                        value={plant.adoptionDate}
                        onChange={(e) =>
                          handlePlantChange(
                            plant.id,
                            'adoptionDate',
                            e.target.value
                          )
                        }
                        className='w-full rounded-lg border border-gray-300 p-2'
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
            <button
              type='button'
              onClick={handleAddPlant}
              className='mr-4 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600'
            >
              + Add Plant
            </button>
            <div className='mt-6'>
              <button
                type='button'
                onClick={prevStep}
                className='mr-4 rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600'
              >
                Back
              </button>
              <button
                type='button'
                onClick={nextStep}
                className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
              >
                Next: Add Sensors
              </button>
            </div>
          </div>

          {/* Step 3: Sensor Form */}
          <div className='min-w-full flex-shrink-0 p-6'>
            <h1 className='mb-4 text-2xl font-bold'>Add Sensors</h1>
            {plants.map((plant) => (
              <div key={plant.id} className='mb-6'>
                <h3 className='mb-2 text-lg font-medium'>
                  {plant.name} - Sensors
                </h3>
                {plant.sensors.map((sensor, sensorIndex) => (
                  <div
                    key={sensor.id}
                    className='relative mb-4 rounded-lg border bg-white p-3'
                  >
                    <button
                      type='button'
                      onClick={() => handleDeleteSensor(plant.id, sensor.id)}
                      className='absolute right-2 top-2 text-3xl font-bold text-red-500 hover:text-red-700'
                      title='Delete Sensor'
                    >
                      ×
                    </button>
                    <button
                      type='button'
                      onClick={() => toggleSensorExpand(plant.id, sensor.id)}
                      className='absolute left-2 top-2 rounded-full bg-white bg-opacity-80 px-2 py-0.5 text-xl font-bold text-gray-500 shadow hover:text-gray-700'
                      title={
                        expandedSensors[plant.id]?.[sensor.id]
                          ? 'Collapse'
                          : 'Expand'
                      }
                    >
                      {expandedSensors[plant.id]?.[sensor.id] ? '−' : '+'}
                    </button>
                    <h5 className='mb-1 pl-8 text-sm font-semibold'>
                      Sensor {sensorIndex + 1}
                    </h5>
                    <p className='mb-2 pl-8 text-sm text-gray-600'>
                      Sensor ID: {sensor.id}
                    </p>
                    {expandedSensors[plant.id]?.[sensor.id] && (
                      <>
                        <div className='mb-2'>
                          <label className='mb-1 block text-xs font-medium'>
                            Label
                          </label>
                          <input
                            type='text'
                            value={sensor.label}
                            onChange={(e) =>
                              handlePlantChange(
                                plant.id,
                                `sensors[${sensorIndex}].label`,
                                e.target.value
                              )
                            }
                            className='w-full rounded-lg border border-gray-300 p-2'
                          />
                        </div>
                        <div className='mb-2'>
                          <label className='mb-1 block text-xs font-medium'>
                            Quantity and Unit
                          </label>
                          <input
                            type='text'
                            value={sensor.quantity}
                            onChange={(e) =>
                              handlePlantChange(
                                plant.id,
                                `sensors[${sensorIndex}].quantity`,
                                e.target.value
                              )
                            }
                            className='w-full rounded-lg border border-gray-300 p-2'
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => handleAddSensor(plant.id)}
                  className='text-sm text-blue-500 hover:underline'
                >
                  + Add Sensor
                </button>
              </div>
            ))}
            <div className='mt-6'>
              <button
                type='button'
                onClick={prevStep}
                className='mr-4 rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600'
              >
                Back
              </button>
              <button
                type='button'
                onClick={() => alert('Configuration Complete!')}
                className='rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700'
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
