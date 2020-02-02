%%  import
%     gaussianKernel.m
%     dataset3Params.m
%     processEmail.m
%     emailFeatures.m
%
%     plotData.m
%     svmTrain.m
%
%%

%% Initialization
clear ; close all; clc

fprintf('Loading and Visualizing Data ...\n')

% Load from ex6data1:
% You will have X, y in your environment
load('ex6data1.mat');

% Plot training data
plotData(X, y);

pause;

C = 1;
model = svmTrain(X, y, C, @linearKernel, 1e-3, 20);
visualizeBoundaryLinear(X, y, model);
