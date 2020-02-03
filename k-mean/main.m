clear ; close all; clc
load ('data/ex7data2.mat');

K = 3; % 3 Centroids
initial_centroids = [3 3; 6 2; 8 5];

idx = findClosestCentroids(X, initial_centroids);

%{
hold on
plot(X(:, 1), X(:, 2), 'bo');
plot(initial_centroids(:, 1), initial_centroids(:, 2), 'yo');
%}
fprintf(' %d', idx(1:3));


centroids = computeCentroids(X, idx, K);
fprintf(' %f %f \n' , centroids');
fprintf('\n(the centroids should be\n');
fprintf('   [ 2.428301 3.157924 ]\n');
fprintf('   [ 5.813503 2.633656 ]\n');
fprintf('   [ 7.119387 3.616684 ]\n\n');

%{
for i=1:10
  idx = findClosestCentroids(X, centroids);
  centroids = computeCentroids(X, idx, K);
  plot(centroids(:, 1), centroids(:, 2), 'ro');
end
hold off
%}

K = 3;
max_iters = 10;
initial_centroids = [3 3; 6 2; 8 5];
[centroids, idx] = runkMeans(X, initial_centroids, max_iters, true);
fprintf('\nK-Means Done.\n\n');
