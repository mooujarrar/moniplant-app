import React, { useState } from 'react';
import { EPage, useActivePageStore } from '../../state-management/activePage';
import uuid from 'react-uuid';

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

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <>
      {activePage === EPage.CONFIG && (
        <div className='absolute top-0 z-10 flex h-5/6 w-full items-center justify-center bg-opacity-0 p-4 pb-8 overflow-y-scroll'>
            <div className='relative w-full max-w-4xl overflow-hidden rounded-lg bg-white p-6 shadow-lg'>
              <div
                className='flex transition-transform duration-500 ease-in-out'
                style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
              >
                {/* Step 1: Device Form */}
                <div className='w-full flex-shrink-0'>
                  <h1 className='mb-4 text-2xl font-bold'>
                    Device Configuration
                  </h1>
                  <div className='mb-6'>
                    <label className='mb-2 block text-lg font-medium'>
                      Device Name
                    </label>
                    <input
                      type='text'
                      value={deviceName}
                      onChange={(e) => setDeviceName(e.target.value)}
                      className='w-full rounded-lg border border-gray-300 p-3'
                    />
                    <p className='mt-2 text-sm text-gray-600'>
                      Device ID: {deviceId}
                    </p>
                  </div>
                  <button
                    type='button'
                    onClick={nextStep}
                    className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
                  >
                    Next: Add Plants
                  </button>
                </div>

                {/* Step 2: Plant Form */}
                <div className='w-full flex-shrink-0'>
                  <h1 className='mb-4 text-2xl font-bold'>Add Plants</h1>
                  {plants.map((plant, index) => (
                    <div
                      key={plant.id}
                      className='mb-6 rounded-lg border bg-gray-50 p-4'
                    >
                      <h3 className='mb-2 text-lg font-medium'>
                        Plant {index + 1}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">Plant ID: {plant.id}</p>
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
                        >
                          <option value=''>Select Type</option>
                          <option value='Herb'>Herb</option>
                          <option value='Flower'>Flower</option>
                          <option value='Shrub'>Shrub</option>
                          <option value='Tree'>Tree</option>
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
                <div className='w-full flex-shrink-0'>
                  <h1 className='mb-4 text-2xl font-bold'>Add Sensors</h1>
                  {plants.map((plant, index) => (
                    <div key={plant.id} className='mb-6'>
                      <h3 className='mb-2 text-lg font-medium'>
                        {plant.name} - Sensors
                      </h3>
                      {plant.sensors.map((sensor, sensorIndex) => (
                        <div
                          key={sensor.id}
                          className='mb-4 rounded-lg border bg-white p-3'
                        >
                          <h5 className='mb-1 text-sm font-semibold'>
                            Sensor {sensorIndex + 1}
                          </h5>
                          <p className="text-sm text-gray-600 mb-2">Sensor ID: {sensor.id}</p>
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
        </div>
      )}
    </>
  );
}
