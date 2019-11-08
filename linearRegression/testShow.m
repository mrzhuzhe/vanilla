data = load('ex1data2.txt');
X = data(:, 1); y = data(:, 2); z = data(:, 3);
m = length(X);

plot3(X, y, z, 'rx', 'MarkerSize', 10);
zlabel('Profit in $10,000s');
xlabel('Population of City in 10,000s');
ylabel('nothing but some normal randome varible');

X = [ones(m, 1), data(:,1), data(:,2)]; % Add a column of ones to x
theta = zeros(3, 1); % initialize fitting parameters

computeCost(X, z, theta);

iterations = 1500;
alpha = 0.01;

theta = gradientDescent(X, y, theta, alpha, iterations);

fprintf('Theta found by gradient descent: ');
fprintf('%f %f \n', theta(1), theta(2), theta(3));

hold on;

plot3(X(:,2), X(:,3) , X*theta, '-', 'MarkerSize', 10)

% draw a subspace

theta0_vals = linspace(min(X(:,2)), max(X(:,2)), 100);
theta1_vals = linspace(min(X(:,3)), max(X(:,3)), 100);
J_vals = zeros(length(theta0_vals), length(theta1_vals));

for i = 1:length(theta0_vals)
    for j = 1:length(theta1_vals)
    t = [1, theta0_vals(i), theta1_vals(j)];
    J_vals(i,j) = t*theta;
    end
end

% Because of the way meshgrids work in the surf command, we need to
% transpose J_vals before calling surf, or else the axes will be flipped
surf(theta0_vals, theta1_vals , J_vals')

legend('Training data', 'Linear regression')

%{
  plot(X, y, 'rx', 'MarkerSize', 10); % Plot the data
  ylabel('Profit in $10,000s'); % Set the y?axis label
  xlabel('Population of City in 10,000s'); % Set the x?axis label

  fprintf('Running Gradient Descent ...\n')

  X = [ones(m, 1), data(:,1)]; % Add a column of ones to x
  theta = zeros(2, 1); % initialize fitting parameters

  % Some gradient descent settings
  iterations = 1500;
  alpha = 0.01;

  % compute and display initial cost
  computeCost(X, y, theta)

  % run gradient descent
  theta = gradientDescent(X, y, theta, alpha, iterations);

  % print theta to screen
  fprintf('Theta found by gradient descent: ');
  fprintf('%f %f \n', theta(1), theta(2));

  #{
    % Plot the linear fit
    plot(X(:,2), X*theta, '-')
    legend('Training data', 'Linear regression')
  #}

  fprintf('Visualizing J(theta_0, theta_1) ...\n')

  % Grid over which we will calculate J
  theta0_vals = linspace(-10, 10, 100);
  theta1_vals = linspace(-1, 4, 100);

  % initialize J_vals to a matrix of 0s
  J_vals = zeros(length(theta0_vals), length(theta1_vals));

  % Fill out J_vals

  for i = 1:length(theta0_vals)
      for j = 1:length(theta1_vals)
  	  t = [theta0_vals(i); theta1_vals(j)];
  	  J_vals(i,j) = computeCost(X, y, t);
      end
  end


  % Because of the way meshgrids work in the surf command, we need to
  % transpose J_vals before calling surf, or else the axes will be flipped

  J_vals = J_vals';

  % Surface plot

  figure;
  surf(theta0_vals, theta1_vals, J_vals)
  xlabel('\theta_0'); ylabel('\theta_1');

  % Contour

  figure;

  % Plot J_vals as 15 contours spaced logarithmically between 0.01 and 100

  contour(theta0_vals, theta1_vals, J_vals, logspace(-2, 3, 20))
  xlabel('\theta_0'); ylabel('\theta_1');
  hold on;
  plot(theta(1), theta(2), 'rx', 'MarkerSize', 10, 'LineWidth', 2);
%}
