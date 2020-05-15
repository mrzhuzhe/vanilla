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


%
A = double(imread('data/bird_small.png'));
A = A ./ 255;
img_size = size(A);

% 分为三通道？
X = reshape(A, img_size(1) * img_size(2), 3);

K = 16;
max_iters = 10;

initial_centroids = kMeansInitCentroids(X, K);

% Run K-Means
[centroids, idx2] = runkMeans(X, initial_centroids, max_iters);

idx = findClosestCentroids(X, centroids);

%{
  注意 这里 centroid 是 16 x 3 的  idx 却是 X 的 m 长度的
  相当于把 centroids 的很多行根据聚类的 k=16核心 复制到其他行
  相当于 只用pivot r=16 个像素 复现矩阵所有内容
  相当于 只用16种颜色 复现图片
%}

X_recovered = centroids(idx,:);
X_recovered = reshape(X_recovered, img_size(1), img_size(2), 3);

figure
subplot(1, 2, 1);
imagesc(A);
title('Original');

subplot(1, 2, 2);
imagesc(X_recovered)
title(sprintf('Compressed, with %d colors.', K));
