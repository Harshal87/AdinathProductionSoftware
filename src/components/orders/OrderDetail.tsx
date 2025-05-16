import React, { useState } from 'react';
import { formatDate, getStageLabel, getStageNumber, getStatusColor, cn } from '../../utils/helpers';
import { Order, OrderStage, OrderStatus } from '../../types';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import TextArea from '../ui/TextArea';
import { Check, X, Upload, ChevronLeft } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface OrderDetailProps {
  order: Order;
  onBack: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onBack }) => {
  const { updateOrder, loading } = useApp();
  const [selectedStage, setSelectedStage] = useState<OrderStage | null>(null);
  const [noteInput, setNoteInput] = useState('');

  const stageOrder: OrderStage[] = [
    'order_received',
    'po_uploaded',
    'material_allocation',
    'printing_in_progress',
    'quality_check',
    'dispatched',
  ];

  const canAdvanceToStage = (stage: OrderStage): boolean => {
    const currentIndex = stageOrder.indexOf(order.currentStage);
    const targetIndex = stageOrder.indexOf(stage);
    
    // Can always work on current stage
    if (stage === order.currentStage) return true;
    
    // Can advance to next stage
    if (targetIndex === currentIndex + 1) {
      // Special case: Can't advance past PO_UPLOADED if it's not completed
      if (stage !== 'po_uploaded' && 
          order.stages.po_uploaded.status !== 'completed') {
        return false;
      }
      return true;
    }
    
    // Can't advance more than one stage ahead
    return false;
  };

  const handleSelectStage = (stage: OrderStage) => {
    setSelectedStage(stage);
    setNoteInput(order.stages[stage].notes);
  };

  const handleSaveNotes = () => {
    if (!selectedStage) return;
    
    const updatedOrder = {
      ...order,
      stages: {
        ...order.stages,
        [selectedStage]: {
          ...order.stages[selectedStage],
          notes: noteInput,
          updatedAt: new Date(),
        },
      },
    };
    
    updateOrder(updatedOrder);
    setSelectedStage(null);
  };

  const handleUpdateStatus = (stage: OrderStage, status: OrderStatus) => {
    if (!selectedStage) return;
    
    // Check if we're completing a stage
    const isCompleting = status === 'completed' && order.stages[stage].status !== 'completed';
    
    const updatedOrder = {
      ...order,
      stages: {
        ...order.stages,
        [stage]: {
          ...order.stages[stage],
          status,
          updatedAt: new Date(),
          ...(isCompleting ? { completedAt: new Date() } : {}),
        },
      },
    };
    
    // If we're completing the current stage, advance to next stage
    if (isCompleting && stage === order.currentStage) {
      const currentIndex = stageOrder.indexOf(order.currentStage);
      if (currentIndex < stageOrder.length - 1) {
        const nextStage = stageOrder[currentIndex + 1];
        updatedOrder.currentStage = nextStage;
        updatedOrder.lastUpdated = new Date();
      }
    }
    
    updateOrder(updatedOrder);
    setSelectedStage(null);
  };

  const handleCancelEdit = () => {
    setSelectedStage(null);
    setNoteInput('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            leftIcon={<ChevronLeft size={16} />}
          >
            Back
          </Button>
          <h2 className="text-xl font-semibold text-gray-900">{order.id}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="info">
            {getStageLabel(order.currentStage)}
          </Badge>
          <p className="text-sm text-gray-500">
            Created: {formatDate(order.created)}
          </p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Order Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Client</p>
              <p className="text-sm font-medium">{order.clientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-sm font-medium">{formatDate(order.lastUpdated)}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Timeline</h3>
          
          <div className="relative">
            {/* Progress Bar */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
            
            {/* Stages */}
            <div className="space-y-8 relative z-10">
              {stageOrder.map((stage) => {
                const stageDetail = order.stages[stage];
                const isCurrentStage = order.currentStage === stage;
                const isCompleted = stageDetail.status === 'completed';
                const isInProgress = stageDetail.status === 'in_progress';
                const isActive = stage === selectedStage;
                const isFirstPendingStage = order.currentStage === stage && stageDetail.status !== 'completed';
                const isPORequired = stage !== 'order_received' && 
                                     stage !== 'po_uploaded' && 
                                     order.stages.po_uploaded.status !== 'completed';
                
                return (
                  <div key={stage} className={cn("relative", isActive ? "bg-blue-50 rounded-lg p-4 -ml-4 -mr-4" : "")}>
                    <div className="flex items-start">
                      <div className={cn(
                        "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center z-10",
                        isCompleted ? "bg-green-100 text-green-700" : 
                        isInProgress ? "bg-blue-100 text-blue-700" : 
                        "bg-gray-100 text-gray-400"
                      )}>
                        <div className="text-sm font-medium">{getStageNumber(stage)}</div>
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={cn(
                            "text-base font-medium",
                            isCompleted ? "text-green-700" : 
                            isInProgress ? "text-blue-700" : 
                            "text-gray-600"
                          )}>
                            {getStageLabel(stage)}
                          </h4>
                          
                          <div className="flex items-center">
                            {(isPORequired && stage !== 'po_uploaded') && (
                              <Badge variant="error" className="mr-2">
                                PO Required
                              </Badge>
                            )}
                            
                            {!isActive && (
                              <Badge className={getStatusColor(stageDetail.status)}>
                                {stageDetail.status === 'pending' ? 'Pending' : 
                                 stageDetail.status === 'in_progress' ? 'In Progress' : 'Completed'}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {stageDetail.status !== 'pending' && !isActive && stageDetail.notes && (
                          <p className="mt-1 text-sm text-gray-600">{stageDetail.notes}</p>
                        )}
                        
                        {stageDetail.files.length > 0 && !isActive && (
                          <div className="mt-2">
                            <div className="text-sm font-medium text-gray-500 mb-1">Files:</div>
                            <div className="flex flex-wrap gap-2">
                              {stageDetail.files.map((file) => (
                                <div 
                                  key={file.id} 
                                  className="text-xs bg-gray-100 rounded px-2 py-1 flex items-center"
                                >
                                  <Upload size={12} className="mr-1" />
                                  <span>{file.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {stageDetail.completedAt && !isActive && (
                          <p className="mt-1 text-xs text-gray-500">
                            Completed on {formatDate(stageDetail.completedAt)}
                          </p>
                        )}
                        
                        {isActive ? (
                          <div className="mt-4 space-y-4">
                            <TextArea
                              label="Notes"
                              value={noteInput}
                              onChange={(e) => setNoteInput(e.target.value)}
                              placeholder="Add notes for this stage..."
                              rows={3}
                            />
                            
                            <div className="flex items-center space-x-2">
                              <input
                                type="file"
                                id="file-upload"
                                className="sr-only"
                              />
                              <label
                                htmlFor="file-upload"
                                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <Upload size={16} className="mr-2" />
                                Upload Files
                              </label>
                            </div>
                            
                            <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
                              <Button
                                onClick={handleSaveNotes}
                                isLoading={loading}
                                leftIcon={<Check size={16} />}
                              >
                                Save Notes
                              </Button>
                              
                              {stageDetail.status !== 'completed' && (
                                <Button
                                  variant="outline"
                                  onClick={() => handleUpdateStatus(stage, 'completed')}
                                  isLoading={loading}
                                >
                                  Mark as Completed
                                </Button>
                              )}
                              
                              <Button
                                variant="ghost"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2">
                            {canAdvanceToStage(stage) && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSelectStage(stage)}
                              >
                                {stageDetail.status === 'pending' ? 'Start Stage' : 'Update Stage'}
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;